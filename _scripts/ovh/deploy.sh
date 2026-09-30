#!/usr/bin/env bash
# Publie une édition sur l'hébergement mutualisé OVH, via SFTP (lftp).
#
#   <OVH_REMOTE_DIR>/<YEAR>/   ← contenu de SITE_DIR (miroir, fichiers obsolètes supprimés)
#   <OVH_REMOTE_DIR>/.htaccess ← ROOT_HTACCESS, s'il est fourni
#   <HTPASSWD_REMOTE>          ← HTPASSWD, s'il est fourni (test)
#
# Ordre : le dossier de l'édition d'abord, puis le .htpasswd, et le
# .htaccess racine en dernier, pour qu'il ne pointe jamais vers une édition
# ou un fichier de mots de passe pas encore publié.
#
# Variables requises : OVH_SFTP_HOST, OVH_SFTP_USER, OVH_SFTP_PASSWORD,
#   OVH_SFTP_KNOWN_HOSTS (ligne(s) known_hosts du serveur), OVH_REMOTE_DIR,
#   YEAR, SITE_DIR.
# Variables optionnelles : OVH_SFTP_PORT (22), ROOT_HTACCESS, HTPASSWD,
#   HTPASSWD_REMOTE.

set -euo pipefail

for var in OVH_SFTP_HOST OVH_SFTP_USER OVH_SFTP_PASSWORD OVH_SFTP_KNOWN_HOSTS \
  OVH_REMOTE_DIR YEAR SITE_DIR; do
  if [ -z "${!var:-}" ]; then
    echo "Variable manquante : $var" >&2
    exit 1
  fi
done
if [[ ! "$YEAR" =~ ^[0-9]{4}$ ]]; then
  echo "YEAR invalide : $YEAR" >&2
  exit 1
fi
if [ ! -f "$SITE_DIR/index.html" ]; then
  echo "$SITE_DIR/index.html introuvable : le site est-il construit ?" >&2
  exit 1
fi
if [ -n "${HTPASSWD:-}" ] && [ -z "${HTPASSWD_REMOTE:-}" ]; then
  echo "HTPASSWD fourni sans HTPASSWD_REMOTE" >&2
  exit 1
fi

tmp=$(mktemp -d)
trap 'rm -rf "$tmp"' EXIT
printf '%s\n' "$OVH_SFTP_KNOWN_HOSTS" >"$tmp/known_hosts"

remote="${OVH_REMOTE_DIR%/}"
{
  echo "set cmd:fail-exit yes"
  echo "set net:max-retries 3"
  echo "set net:timeout 30"
  # Clé du serveur vérifiée : pas d'acceptation aveugle d'une clé inconnue.
  echo "set sftp:connect-program \"ssh -a -x -o StrictHostKeyChecking=yes -o UserKnownHostsFile=$tmp/known_hosts\""
  echo "open --env-password -u \"$OVH_SFTP_USER\" -p \"${OVH_SFTP_PORT:-22}\" \"sftp://$OVH_SFTP_HOST\""
  echo "mkdir -p -f \"$remote\""
  echo "mirror --reverse --delete --no-perms --parallel=4 --verbose=1 \"$SITE_DIR\" \"$remote/$YEAR\""
  if [ -n "${HTPASSWD:-}" ]; then
    echo "put \"$HTPASSWD\" -o \"$HTPASSWD_REMOTE\""
  fi
  if [ -n "${ROOT_HTACCESS:-}" ]; then
    echo "put \"$ROOT_HTACCESS\" -o \"$remote/.htaccess\""
  fi
  echo "bye"
} >"$tmp/commands.lftp"

LFTP_PASSWORD="$OVH_SFTP_PASSWORD" lftp -f "$tmp/commands.lftp"
echo "Édition $YEAR publiée dans $remote/$YEAR"
