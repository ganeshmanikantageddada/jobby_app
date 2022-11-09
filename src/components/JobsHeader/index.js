import './index.css'

import {AiOutlineSearch} from 'react-icons/ai'

const JobsHeader = () => (
  <div className="header-container">
    <div className="search-container">
      <input type="search" placeholder="Search" className="search-input" />
      <div className="search-icon-container">
        <AiOutlineSearch className="search-icon" />
      </div>
    </div>
  </div>
)

export default JobsHeader
