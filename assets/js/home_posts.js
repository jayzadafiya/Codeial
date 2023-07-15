{
    // method to submit the form data for rnew post using AJAX
    let createPost = function () {
        let newPostForm = $('#new-post-form');

        newPostForm.submit(function (e) {
            e.preventDefault();
            $.ajax({
                type: 'post',
                url: '/posts/create',
                data: newPostForm.serialize(),
                success: function (data) {
                    // console.log(data);
                    let newPost  =newPostDom(data.data.post);
                    // prepend add item to first of list
                    $('#posts-list-container>ul').prepend(newPost);
                    deletePost($(' .delete-post-button',newPost))
                },
                error: function (err) {
                    console.log(err.responseText);
                }
            })

        })
    }

    //method to create a post in DOM
    let newPostDom = function (post) {
        return $(`<li id="post-${post._id}">
    <p>
       
            <small>
                <a class="delete-post-button" href="/posts/destroy/${post._id}">X</a>
            </small>
            
                ${post.content}
                    <br>
                    <small>
                        <!-- <%= post.user %> -->
                        ${ post.user.name}
                    </small>
    </p>
    <div class=" post-comments">
      
            <form action="/comments/create" method="post">
                <input type="text" name="content" placeholder="Type Here to add comment...">
                <input type="hidden" name="post" value="${post._id}">
                <input type="submit" value="Add Comment">
            </form>
    

                <div class="post-comments-list">
                    <ul id="post-comments-${post._id}">
                      
                    </ul>

            </div>
    </div>
</li>`)
    }

    // method to  delete post 
    let deletePost=function(deleteLink){
        $(deleteLink).click(function (e) {
            e.preventDefault();

            $.ajax({
                type: "get",
                url: (deleteLink).prop('href'), //give value of href 
                success:function(data){
                    $(`#post-${data.data.post_id}`).remove();
                },
                error:function(err){
                    console.log(err.responseText);
                }
            })
        })

    }

    // loop over all the existing posts on the page (when the window loads for the first time) and call the delete post method on delete link of each, also add AJAX (using the class we've created) to the delete button of each
    let convertPostsToAjax = function () {
        console.log("ajax");
        $("#posts-list-container>div").each(function () {
            let self = $(this);
            console.log(self);
            let deleteButton = $(" .delete-post-btn", self);
            console.log(deleteButton);
            deletePost(deleteButton);

            // get the post's id by splitting the id attribute
            let postId = self.prop("id").split("-")[1];
            new PostComments(postId);
        });
    };



    createPost();
    convertPostsToAjax();   
}