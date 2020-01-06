# submission-portal

A submission portal for weblab students

## start dev

in two terminals, run:

```
$ npm run start
$ npm run dev
```

make sure you've downloaded the .env file from staff drive

## running in production

ssh into the staff server, and run these commands
note that will probably not work on your local machine

```
$ npx webpack
$ npm run prod
```

the server will be running in the background, and output will be dumped to files in the `logs/` directory.
you can stream the contents of these files in real time:

```
$ tail -f logs/out.log
```

to kill the prod server,

```
$ npm run stop
```

## configuration

### adding new milestones

a milestone requires two links

- **hand-in link**: the link to the google form. to set up team name autocompletion, go to the google form editor, then open the settings menu and hit "get pre-filled link". in the "team name" field, type `$TEAMNAME` and then then hit "get link". use this as the hand-in link
- **response link**: this is a link to the responses spreadsheets
