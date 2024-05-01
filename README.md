This application consists of a python Flask backend and a React + Typescript + Vite front end. Both need to be running for the application to work properly.

# Initial Setup (To Be Completed Once)

## Intial setup for the backend

Make sure you have Python 3.0 installed on your machine.

### From inside the `api` folder:

Create a virtual environment for Flask

```
py -3 -m venv .venv
```

Activate the virtual environment (make sure you are using PowerShell or Command Prompt)

```
.venv\Scripts\activate
```

Install Flask within the activated environment (from the same terminal as the command above)

```
pip install Flask
```

## Intial setup for the frontend

From inside the `shopping-list-web` folder

```
npm install
```

# Running the application

## Running the backend

From inside the `api` folder, in gitbash

```
source .venv/Scripts/activate && flask run --debug
```

## Running the frontend

From inside the `shopping-list-web` folder

```
npm run dev
```
