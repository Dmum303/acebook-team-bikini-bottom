export default function FriendCard (props) {
  const friend = props.friend;

  return (
    <div className='friend-card'>
      <div className="friend-picture">
        <img class='pfp-img' src='https://avatarfiles.alphacoders.com/152/152177.jpg' alt="" height='100' width='100' />
      </div>
      <div className="friend-name-container">
        <p className='friend-name'>{friend.firstName + ' ' + friend.lastName}</p>
      </div>
      
    </div>
  )
}