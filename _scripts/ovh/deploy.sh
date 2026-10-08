#!/usr/bin/env bash
# Publie une édition sur l'hébergement mutualisé OVH, via SFTP (lftp), avec
# les mêmes secrets et options que le dépôt developers-group-dijon/site.
#
#   <REMOTE_DIR>/<YEAR>/     ← contenu de SITE_DIR (miroir, fichiers obsolètes supprimés)
#   <REMOTE_DIR>/.htpasswd   ← HTPASSWD, s'il est fourni (test)
#   <REMOTE_DIR>/.htaccess   ← ROOT_HTACCESS, s'il est fourni
#
# Ordre : le dossier de l'édition d'abord, puis le .htpasswd, et le
# .htaccess racine en dernier, pour qu'il ne pointe jamais vers une édition
# ou un fichier de mots de passe pas encore publié.
#
# Variables requises : SFTP_HOST, SFTP_USER, LFTP_PASSWORD (secrets
#   FTP_SERVER, FTP_USERNAME, FTP_PASSWORD de l'environnement GitHub),
#   ENV_NAME, REMOTE_DIR, YEAR, SITE_DIR.
# Variables optionnelles : ROOT_HTACCESS, HTPASSWD.

set -euo pipefail

for v in SFTP_HOST SFTP_USER LFTP_PASSWORD; do
  if [ -z "${!v:-}" ]; then
    echo "::error::$v est vide : secret absent de l'environnement GitHub « ${ENV_NAME:-?} » ou du dépôt"
    exit 1
  fi
done
for v in ENV_NAME REMOTE_DIR YEAR SITE_DIR; do
  if [ -z "${!v:-}" ]; then
    echo "::error::$v est vide"
    exit 1
  fi
done
if [[ ! "$YEAR" =~ ^[0-9]{4}$ ]]; then
  echo "::error::YEAR invalide : $YEAR"
  exit 1
fi
if [ ! -f "$SITE_DIR/index.html" ]; then
  echo "::error::$SITE_DIR/index.html introuvable : le site est-il construit ?"
  exit 1
fi

remote="${REMOTE_DIR%/}"
commands=$(mktemp)
trap 'rm -f "$commands"' EXIT
{
  echo "set cmd:fail-exit yes"
  echo "set sftp:auto-confirm yes"
  echo "set net:max-retries 3"
  echo "open --env-password -u \"$SFTP_USER\" \"sftp://$SFTP_HOST\""
  echo "mkdir -p -f \"$remote\""
  # --delete : supprime du serveur tout ce qui n'est pas dans la nouvelle version
  echo "mirror --reverse --delete --verbose --parallel=4 \"${SITE_DIR%/}/\" \"$remote/$YEAR/\""
  if [ -n "${HTPASSWD:-}" ]; then
    echo "put \"$HTPASSWD\" -o \"$remote/.htpasswd\""
  fi
  if [ -n "${ROOT_HTACCESS:-}" ]; then
    echo "put \"$ROOT_HTACCESS\" -o \"$remote/.htaccess\""
  fi
  echo "bye"
} >"$commands"

lftp -f "$commands"
echo "Édition $YEAR publiée en $ENV_NAME dans $remote/$YEAR"
