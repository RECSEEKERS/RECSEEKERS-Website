export default {
    name: 'linkedinPost',
    title: 'LinkedIn Feed',
    type: 'document',
    fields: [
      { name: 'content', title: 'Post Content', type: 'text' },
      { name: 'postUrl', title: 'LinkedIn URL', type: 'url' },
      { name: 'publishedAt', title: 'Published Date', type: 'datetime' },
      { name: 'imageUrl', title: 'Image URL', type: 'url' } // Optional, if your RSS pulls images
    ]
  }