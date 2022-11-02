const updateBtn = $('#update-btn');
const deleteBtn = $('#delete-btn');
const postId = $('input[name="post-id"]').attr('data-id');

const editPostHandler = async (event) => {
    event.preventDefault();

    console.log(`Id: ${postId}`);
    const postTitle = document.getElementById('post-title').value.trim();
    const postBody = document.getElementById('post-body').value.trim();

    if (postTitle && postBody) {
        const response = await fetch(`/dashboard/edit/${postId}`, {
            method: 'PUT',
            body: JSON.stringify({
                title: postTitle,
                body: postBody
            }),
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (response.ok) {
            document.location.replace('/dashboard');
        } else {
            alert('Failed to update post');
        }
    }
};

const deletePostHandler = async (event) => {
    event.preventDefault();

    console.log(`Id: ${postId}`);
    const response = await fetch(`/dashboard/edit/${postId}`, {
        method: 'DELETE',
    });

    if (response.ok) {
        document.location.replace('/dashboard');
    } else {
        alert('Failed to delete post');
    }

};

updateBtn.on('click', editPostHandler);

deleteBtn.on('click', deletePostHandler);
