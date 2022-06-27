import { useDispatch } from "react-redux"
import { useParams } from "react-router-dom"
import { editCard } from "../../features/cards/cards"

const LabelsPopoverLabel = ({labels, color, ind }) => {
  const dispatch = useDispatch()
  const selected = labels.includes(color)
  const {id} = useParams()

  const topDivClass = `${color} colorblindable`
  const topDivDataId = `${ind}`
  const labelBackgroundClass = `label-background ${color}`
  
  const handleSelectLabel = () => {
    if (selected) {
      labels = labels.filter(label => label !== color)
    } else {
      labels = labels.concat(color)  
    }
    dispatch(editCard({
      cardId: id,
      updatedCard: {
        card: { labels }
      }
    }))
  } 
  return (
        <li>
          <div className={topDivClass} data-id={topDivDataId} onClick={ handleSelectLabel }>
            { selected ?
              (<i className="check-icon sm-icon"></i>) :
              null
            }
          </div>
          <div className={labelBackgroundClass}></div>
          <div className="label-background-overlay"></div>
          <i className="edit-icon icon not-implemented"></i>
        </li>

    // <>
    // <li>
    //             <div className="green colorblindable" data-id="1">
    //               <i className="check-icon sm-icon"></i>
    //             </div>
    //             <div className="label-background green"></div>
    //             <div className="label-background-overlay"></div>
    //             <i className="edit-icon icon not-implemented"></i>
    //           </li>





    //           <li>
    //             <div className="yellow colorblindable" data-id="2">
    //               <i className="check-icon sm-icon"></i>
    //             </div>
    //             <div className="label-background yellow"></div>
    //             <div className="label-background-overlay"></div>
    //             <i className="edit-icon icon not-implemented"></i>
    //           </li>
    //           <li>
    //             <div className="orange colorblindable" data-id="3">
    //               <i className="check-icon sm-icon"></i>
    //             </div>
    //             <div className="label-background orange"></div>
    //             <div className="label-background-overlay"></div>
    //             <i className="edit-icon icon not-implemented"></i>
    //           </li>
    //           <li>
    //             <div className="red colorblindable" data-id="4">
    //               <i className="check-icon sm-icon"></i>
    //             </div>
    //             <div className="label-background red"></div>
    //             <div className="label-background-overlay"></div>
    //             <i className="edit-icon icon not-implemented"></i>
    //           </li>
    //           <li>
    //             <div className="purple colorblindable" data-id="5">
    //               <i className="check-icon sm-icon"></i>
    //             </div>
    //             <div className="label-background purple"></div>
    //             <div className="label-background-overlay"></div>
    //             <i className="edit-icon icon not-implemented"></i>
    //           </li>
    //           <li>
    //             <div className="blue colorblindable" data-id="6">
    //               <i className="check-icon sm-icon"></i>
    //             </div>
    //             <div className="label-background blue"></div>
    //             <div className="label-background-overlay"></div>
    //             <i className="edit-icon icon not-implemented"></i>
    //           </li>
    // </>
  )
}

export default LabelsPopoverLabel;