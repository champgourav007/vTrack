import {announcementIcon} from '../../common/icons/index'
import './announcement.css'
import { Button } from '@mui/material';

export const Announcement = () => {
  return(
    <>
        <div className='announcement-wrapper'>
            <img className='announcement-icon' src={announcementIcon} alt='announcementIcon'/>
            <div className='announcement-name'>
                Announcement - 
            </div>
            <div className='announcement-text'>
                <span>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ornare, quam ac facilisis mattis, ex urna pharetra eros, id condimentum</span>
            </div>
            <div className='read-more'>
              <Button variant="text"><span className='button-text'>Read More</span></Button>
            </div>
        </div>
    </>
  )
}

export default Announcement;