#appGallery
**_image's gallery: in this app the users use the app for share your posts and comment about this. Only users signin can post and comment._**

## DEV Tools : 📝
_Database creation (noSQL) with MongoDB and Mongoose as ORM. Using NodeJS technologies, and bcrypts libraries, jason web token for login and authentication.

###Routes

• Users
_Sign up_
https://localhost:XXXX/users/signup
name, lastName, email, password, avatar, date, description 

_Sign in_
https://localhost:XXXX/users/signin
email, password

_Verify users_
https://localhost:XXXX/users/confirm
email

_Get all users, includes admin (only Admin)_
https://localhost:XXXX/users/all
token, password

_Get just 5 random users_
https://localhost:XXXX/users/first


_Search for a users with the name..._
https://localhost:XXXX/users/search
name

_Get a specific user_
https://localhost:XXXX/users/user
atUser

_Edit user_
https://localhost:XXXX/users/edit
email, password, name, lastName, avatar, date, description, atUser 

_Change the User's password_
https://localhost:XXXX/users/edit-pass
email, password, newPassword

_Reset password_
https://localhost:XXXX/users/reset-pass
email

_Convert at user to admin or not_
https://localhost:XXXX/users/addadmin
token, password, email (to convert admin)

_Delete user_
https://localhost:XXXX/users/remove
 email, password


• Posts

_Create post_
https://localhost:XXXX/posts/create
token, password, img, description, atUsers

_Get all user's posts_
https://localhost:XXXX/posts/all
token, atUser

_Search for a post_
https://localhost:XXXX/posts/search
id

_Edit post_
https://localhost:XXXX/posts/edit
token, id (del post), img, description, atUsers

_Delete post_
https://localhost:XXXX/posts/remove
token, id


• Comments

_Create comment_
https://localhost:XXXX/comments/create
token text idPost

_Get all post's comment_
https://localhost:XXXX/comments/all
idPost

_Search for a comment_
https://localhost:XXXX/comments/search
id (del comment)

_Edit comment_
https://localhost:XXXX/comments/edit
token id(del comment) text

_Delete comment_
https://localhost:XXXX/comments/remove
token id(del comment)
