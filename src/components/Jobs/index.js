import {Component} from 'react'

import Cookies from 'js-cookie'

import Loader from 'react-loader-spinner'

import './index.css'

import JobsHeader from '../JobsHeader/index'
import JobsPortal from '../JobsPortal/index'
import JobsSideBar from '../JobsSideBar/index'

class Jobs extends Component {
  state = {jobsLIst: [], error: false, loader: false}

  componentDidMount() {
    this.getDetails()
  }

  getDetails = async () => {
    this.setState({loader: true})
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = 'https://apis.ccbp.in/jobs'
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }

    const response = await fetch(apiUrl, options)
    const data = await response.json()
    if (response.status === 200) {
      const {jobs} = data
      const fetcheddata = jobs.map(item => ({
        companyLogoUrl: item.company_logo_url,
        employmentType: item.employment_type,
        id: item.id,
        jobDescription: item.job_description,
        location: item.location,
        packagePerAnnum: item.package_per_annum,
        rating: item.rating,
        title: item.title,
      }))
      this.setState({loader: false, jobsLIst: fetcheddata})
    } else {
      this.setState({loader: false, error: true})
    }
  }

  render() {
    const {loader, error, jobsLIst} = this.state

    const styling = loader ? 'loader-container-1' : 'loader-container-2'

    return (
      <div className="jobs-container">
        <div className="jobs-left-container">
          <JobsSideBar />
        </div>
        <div className="jobs-right-container">
          <JobsHeader />
          <div className="jobs-portal">
            {loader ? (
              <div className={styling}>
                <Loader
                  type="ThreeDots"
                  color="#ffffff"
                  height="50"
                  width="50"
                />
              </div>
            ) : (
              <JobsPortal list={jobsLIst} />
            )}
          </div>
        </div>
      </div>
    )
  }
}

export default Jobs
