$("#new-blog-form").form({
    fields: {
        title: {
            identifier: 'blog[title]',
            rules: [
                {
                    type: 'empty',
                    prompt: 'Please enter a title for the post'
                }
            ]
        },
        image: {
            identifier: 'blog[image]',
            rules: [
                {
                    type: 'regExp',
                    value: /^((http|https|ftp):\/\/)/i,
                    prompt: 'Please enter a valid URL for the post image'
                }
            ]
        },
        body: {
            identifier: 'blog[body]',
            rules: [
                {
                    type: 'empty',
                    prompt: 'A blog post needs a body! Please add a body'
                }
            ]
        }
    }
});

$(".ui.dropdown").dropdown();