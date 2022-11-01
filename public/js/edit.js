const editPostForm = $('#edit-post-form');

async function editPostHandler(event) {
    event.preventDefault();

    const postTitle = document.getElementById('post-title').value.trim();
    const postBody = document.getElementById('post-body').value.trim();
    
    if(postTitle && postBody) {
        const response = await fetch(`/api/posts`, {
            method: 'PUT',
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
            alert('Failed to update post');
        }
    }
}

newPostForm.on('submit', editPostHandler);

