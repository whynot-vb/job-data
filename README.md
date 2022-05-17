### Developer Job Data

This is full stuck MERN application designed for company owners, and users searching for developer jobs. All jobs are made up, although some companies
do exist.

### Project Description

On the first mount jobs are updated from the database and first 10 are shown on the screen. User can see other jobs by clicking page in the bottom of the screen.
Without logging in user can filter jobs by 4 criteria and sort alphabetically by job name, by date when job expires and by number of likes which is a default sort on mount. If the user is logged in he can like job, or create a new job, edit or delete job he created.
On the server side i used Node.js with express framework for routing and middleware. As for database for users and jobs i used mongodb. On the frontend i used React.js, and for managing global state i used Redux. For testing i mostly used Redux dev tools. For style i mostly used material-ui components with some css.

If you want to clone and use this project you must have your own mongodb url connection, and you must create your json web token secret and expiration date.
# DeveloperJobData
