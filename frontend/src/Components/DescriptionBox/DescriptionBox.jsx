import React from 'react'
import './DescriptionBox.css'

const DescriptionBox = () => {
  return (
    <div className='descriptionbox'>
        <div className="descriptionbox-navigator">
            <div className="descriptionbox-nav-box">Description</div>
            <div className="descriptionbox-nav-box fade">Reviews (123)</div>
        </div>
        <div className="descriptionbox-description">
            <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Explicabo dolorum, hic ex, molestias quidem a voluptas totam dolores odio tempore suscipit laudantium delectus harum aperiam accusamus accusantium quisquam, enim reiciendis.</p>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad, facilis. Minima distinctio maiores, exercitationem magnam soluta aspernatur cupiditate perspiciatis nesciunt totam hic sed laudantium ducimus officia vitae consequatur beatae porro?</p>
        </div>
    </div>
  )
}

export default DescriptionBox