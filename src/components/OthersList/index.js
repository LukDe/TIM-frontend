import React, { PropTypes } from 'react'
import OthersListItem from '../OthersListItem'

function OthersList ({ requests }) {
  return (
    <div className="ui big middle aligned very relaxed selection divided list">
      {requests
        .filter((req) => req.goodName === 'other')
        .map((req) =>
          (<OthersListItem
                key={req.id}
                username={req.username}
                catastrophe={req.catastrophy}
                creationDate={new Date(req.creationDate)}
                goodName={req.goodName}
                postalCode={req.postalCode}
                misc={req.misc}/>))}
    </div>
  )
}

OthersList.propTypes = {
  requests: PropTypes.array
}

export default OthersList
