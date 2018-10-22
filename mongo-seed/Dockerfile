FROM mongo

COPY init.json /init.json
CMD mongoimport --host mongodb --db local --collection auths --type json --file /init.json --jsonArray