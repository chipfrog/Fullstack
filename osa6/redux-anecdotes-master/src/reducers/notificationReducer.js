const notificationAtStart = 'Test notification!'

const initialState = notificationAtStart

const notificationReducer = (state = initialState, action) => {
  switch(action.type) {
    case 'NOTIFICATION':
      return state

    default:
      return state  
  }
}
// export const notificate = (content) => {
//   return {
//     type: 'NOTIFICATION',
//     data: { content }
//   }
// }


export default notificationReducer

