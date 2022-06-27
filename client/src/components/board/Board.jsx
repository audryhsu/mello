import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useLocation } from 'react-router-dom';
import { fetchBoard } from '../../features/boards/boards';
import BoardHeader from './BoardHeader';
import BoardLists from './BoardLists';
import { HTML5Backend } from 'react-dnd-html5-backend'
import { DndProvider } from 'react-dnd'

const Board = () => {
  const locationArr = useLocation().pathname.split('/')
  const { id } = useParams() // board id or card id depending on route
  const cards = useSelector(state => state.cards)
  let boardId;
  
  if (locationArr.includes('boards')) {
    boardId = id
  } else {
    let card = cards.find(card => card._id === id)
    boardId = card ? card.boardId : null

  }

  const dispatch = useDispatch()
  const boards = useSelector(state => state.boards)

  const board = boards.find(({_id}) => _id === boardId )
  
  useEffect(() => {
    if (boardId) {
      dispatch(fetchBoard(boardId))
    }

  }, [dispatch, boardId])

  // guards against undefined board during AJAX call
  if (!board) return null
  return (
  <>
      <DndProvider backend={HTML5Backend} >
  <header>
    <BoardHeader boardTitle={board.title} />
  </header>
  <main>
    <BoardLists />
  </main>

 <div className="menu-sidebar">
   <div id="menu-main" className="main slide">
     <i className="back-icon icon"></i>
     <i className="x-icon icon"></i>
     <h1>Menu</h1>
     <div className="menu-contents">
       <div className="members">
         <div className="member-container">
           <div className="card-member ">VR</div>
         </div>
         <div className="member-container">
           <div className="card-member admin">TP</div>
         </div>
         <div className="member-container">
           <div className="card-member ">KW</div>
         </div>
       </div>
       <div className="add-members">
         <i className="add-icon sm-icon"></i>Add Members...
       </div>
       <hr />
       <ul className="menu-list">
         <li className="background-item">Change Background</li>
         <li className="filter-icon menu-icon">Filter Cards</li>
         <li className="power-icon menu-icon not-implemented">Power-Ups</li>
         <li className="stickers-icon menu-icon not-implemented">Stickers</li>
         <li className="more-icon menu-icon">More</li>
         <hr />
         <li className="activity-icon menu-icon not-implemented">Activity</li>
       </ul>
       <ul className="activity-list">
         <li>
           <i className="member-icon"></i>
           <p>
             <span className="member-name">Taylor Peat</span> changed the
             background of this board <small>yesterday at 4:53 PM</small>
           </p>
         </li>
         <li>
           <i className="member-icon"></i>
           <p>
             <span className="member-name">Taylor Peat</span> sent{" "}
             <span className="link">
               Use the + in the top menu to make your first board now.
             </span>{" "}
             to the board <small>4 hours ago</small>
           </p>
         </li>
         <li>
           <i className="member-icon"></i>
           <p>
             <span className="member-name">Taylor Peat</span> archived{" "}
             <span className="link">
               Use the + in the top menu to make your first board now.
             </span>{" "}
             <small>4 hours ago</small>
           </p>
         </li>
         <li>
           <i className="member-icon"></i>
           <p>
             <span className="member-name">Taylor Peat</span> changed the
             background of this board <small>5 hours ago</small>
           </p>
         </li>
         <li>
           <i className="member-icon"></i>
           <p>
             <span className="member-name">Taylor Peat</span> changed the
             background of this board <small>6 hours ago</small>
           </p>
         </li>
         <li>
           <i className="member-icon"></i>
           <p>
             <span className="member-name">Taylor Peat</span> changed the
             background of this board <small>yesterday at 10:23 PM</small>
           </p>
         </li>
       </ul>
       <a className="all-activity not-implemented">View all activity...</a>
     </div>
   </div>
 </div>
 <div id="modal-container"></div>
 <div id="dropdown-container"></div>
 </DndProvider>
</>
);
};

export default Board;