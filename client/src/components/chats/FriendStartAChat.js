import styles from '../../styles/FriendsStartAChat.module.css'

function FriendStartAChat({
  username, picture, id,
}) {
  return (
    <button type="submit" className={styles.friend}>
      <div className={styles.friend__image}>
        <img src={picture} alt="profile" />
      </div>
      <span className={styles.friend__username}>{username}</span>

    </button>
  )
}

export default FriendStartAChat
