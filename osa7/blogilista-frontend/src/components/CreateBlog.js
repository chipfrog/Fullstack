import React from 'react'
import PropTypes from 'prop-types'

const CreateBlogForm = ({
  addBlog,
  title,
  author,
  url
}) => {
  const noReset = (field) => {
    let { reset, ...rest } = field
    return rest
  }
  return (
    <div>
      <h2>Create a new blog</h2>
      <form onSubmit={addBlog}>
        <div>
        Title:
          <input
            {...noReset(title)}
          />
        </div>
        <div>
        Author:
          <input
            {...noReset(author)}
          />
        </div>
        <div>
          Url:
          <input
            {...noReset(url)}
          />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  )
}
CreateBlogForm.propTypes = {
  addBlog: PropTypes.func.isRequired,
  title: PropTypes.object.isRequired,
  author: PropTypes.object.isRequired,
  url: PropTypes.object.isRequired
}


export default CreateBlogForm