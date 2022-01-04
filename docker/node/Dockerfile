FROM node:lts-alpine

# installe un simple serveur http pour servir un contenu statique
RUN npm install -g http-server

# définit le dossier 'app' comme dossier de travail
WORKDIR /app

# installe les dépendances du projet
RUN npm install -g @vue/cli
RUN npm install -gD webpack
RUN npm install -gD webpack-dev-server
RUN npm install -gD webpack-cli

# copie les fichiers et dossiers du projet dans le dossier de travail (par exemple : le dossier 'app')

# construit l'app pour la production en la minifiant

#CMD [ "http-server", "dist" ]
EXPOSE 8080
CMD [ "npm","run","serve"]