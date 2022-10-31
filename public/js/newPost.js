const newPostForm = $('#new-post-form');

async function newPostHandler(event) {
    event.preventDefault();

    const postTitle = document.getElementById('post-title').value.trim();
    const postBody = document.getElementById('post-body').value.trim();

    console.log(`${postTitle}, ${postBody}`);
    
    if(postTitle && postBody) {
        const response = await fetch(`/api/posts`, {
            method: 'POST',
            body: JSON.stringify({
                title: postTitle,
                body: postBody
            }),
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if(response.ok){
            document.location.replace('/dashboard');
        }
        else{
            alert('Failed to create post');
        }
    }
}

newPostForm.on('submit', newPostHandler);
