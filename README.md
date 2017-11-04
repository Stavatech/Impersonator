# Impersonator
Impersonate Linux users to run a command or script

### Quickstart

Start the Impersonator service:
```
  npm start
```

To run commands as a user, you need to generate an access token by authenticating as the user. From another terminal, run:
```
curl 127.0.0.1:31000/tokens -X POST -H "Content-Type: application/json" -d '{"username":"david", "password":"somepassword", "host": "127.0.0.1", "port": 22}'
```

If authentication is successful, the token will be provided in the response, e.g.:
```
1nh5j4rCYmf3NXgGJWk-JMl9Z13G0qlQOLRStL-yw9v6UfnkPNn0eRR-tmOy3c7Ll9W8aUH3E98PIXhyMtCeWg
```

This token can now be used to run commands as the authenticated user:
```
curl 127.0.0.1:31000 -X POST -H "Content-Type: application/json" -X POST -d '{"token":"1nh5j4rCYmf3NXgGJWk-JMl9Z13G0qlQOLRStL-yw9v6UfnkPNn0eRR-tmOy3c7Ll9W8aUH3E98PIXhyMtCeWg", "command": "whoami"}'
```

The ouput is returned in the following JSON structure:
```
{"out":"david\n","err":"","code":0}
```
