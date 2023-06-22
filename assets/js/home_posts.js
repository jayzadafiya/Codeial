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
                <a class="deletepost-button" href="/posts/destroy/${post._id}">X</a>
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
    createPost();
}