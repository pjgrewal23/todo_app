# Running the Application
## Start the server
run the server.exe in the server folder
## Start the client
open terminal in client directory and run
```bash
npm start
```

## Attention
Due to server and client running on the same machine, the application voliates Chrome's same-origin policy

To disable it please follow these steps
Open the start menu

Type windows+R or open "Run"

Execute the following command:

```bash
chrome.exe --user-data-dir="C://Chrome dev session" --disable-web-security
```