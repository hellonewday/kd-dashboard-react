import axios from 'axios'
import React, {useEffect, useState} from 'react'
import {Link} from 'react-router-dom'
import {KTSVG} from '../../_metronic/helpers'
import {Card5} from '../../_metronic/partials/content/cards/Card5'

export function MyPage() {
  const [data, setData] = useState([])
  useEffect(() => {
    axios
      .get('http://localhost:8000/reports/person/12291500')
      .then((response) => {
        if (response.data.result.length > 0) {
          setData(response.data.result)
          console.log(data[0]['data'][0]['governor_id'])
        }
      })
      .catch((error) => {
        setData([])
      })
  }, [])
  return (
    <div>
      <div className='d-flex my-2'>
        <div className='d-flex align-items-center position-relative me-4'>
          <KTSVG
            path='/media/icons/duotune/general/gen021.svg'
            className='svg-icon-3 position-absolute ms-3'
          />
          <input
            type='text'
            id='kt_filter_search'
            className='form-control form-control-white form-control-sm w-200px ps-9'
            placeholder='Governor Id'
          />
        </div>

        <a href='#' className='btn btn-primary btn-sm'>
          Search
        </a>
      </div>
      <div className='separator my-10'></div>

      <div className='card mb-5 mb-xl-10' id='kt_profile_details_view'>
        <div className='card-header cursor-pointer'>
          <div className='card-title m-0'>
            <h3 className='fw-bolder m-0'>Governor Details</h3>
          </div>
        </div>

        <div className='card-body p-9'>
          <div className='row mb-7'>
            <label className='col-lg-4 fw-bold text-muted'>Governor Id</label>

            <div className='col-lg-8'>
              <span className='fw-bolder fs-6 text-dark'>{data[0]['data'][0]['governor_id']}</span>
            </div>
          </div>

          <div className='row mb-7'>
            <label className='col-lg-4 fw-bold text-muted'>Governor Name</label>

            <div className='col-lg-8 fv-row'>
              <span className='fw-bold fs-6'>{data[0]['data'][0]['governor_name']}</span>
            </div>
          </div>

          <div className='row mb-7'>
            <label className='col-lg-4 fw-bold text-muted'>Kingdom</label>

            <div className='col-lg-8 d-flex align-items-center'>
              <span className='fw-bolder fs-6 me-2'>{data[0]['data'][0]['kingdom']}</span>

              <span className='badge badge-success'>Verified</span>
            </div>
          </div>

          <div className='row mb-7'>
            <label className='col-lg-4 fw-bold text-muted'>Alliance</label>

            <div className='col-lg-8'>
              <a href='#' className='fw-bold fs-6 text-dark text-hover-primary'>
                {data[0]['data'][0]['alliance']}
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className='row g-6 g-xl-9'>
        <div className='col-sm-6 col-xl-4'>
          <Card5
            image='/media/svg/brand-logos/twitch.svg'
            title='Twitch Posts'
            description='$500.00'
            status='down'
            statusValue={40.5}
            statusDesc='more impressions'
            progress={0.5}
            progressType='MRR'
          />
        </div>
        <div className='col-sm-6 col-xl-4'>
          <Card5
            image='/media/svg/brand-logos/twitter.svg'
            title='Twitter Followers'
            description='807k'
            status='up'
            statusValue={17.62}
            statusDesc='Followers growth'
            progress={5}
            progressType='New trials'
          />
        </div>
        <div className='col-sm-6 col-xl-4'>
          <Card5
            image='/media/svg/brand-logos/spotify.svg'
            title='Spotify Listeners'
            description='1,073'
            status='down'
            statusValue={10.45}
            statusDesc='Less comments than usual'
            progress={40}
            progressType='Impressions'
          />
        </div>
        <div className='col-sm-6 col-xl-4'>
          <Card5
            image='/media/svg/brand-logos/pinterest-p.svg'
            title='Pinterest Posts'
            description='97'
            status='up'
            statusValue={26.1}
            statusDesc='More posts'
            progress={10}
            progressType='Spend'
          />
        </div>
        <div className='col-sm-6 col-xl-4'>
          <Card5
            image='/media/svg/brand-logos/github.svg'
            title='Github Contributes'
            description='4,109'
            status='down'
            statusValue={32.8}
            statusDesc='Less contributions'
            progress={40}
            progressType='Dispute'
          />
        </div>
        <div className='col-sm-6 col-xl-4'>
          <Card5
            image='/media/svg/brand-logos/youtube-play.svg'
            title='Youtube Subscribers'
            description='354'
            status='up'
            statusValue={29.45}
            statusDesc='Subscribers growth'
            progress={40}
            progressType='Subscribers'
          />
        </div>
        <div className='col-sm-6 col-xl-4'>
          <Card5
            image='/media/svg/brand-logos/telegram.svg'
            title='Telegram Posts'
            description='566'
            status='up'
            statusValue={11.4}
            statusDesc='more clicks'
            progress={40}
            progressType='Profit'
          />
        </div>
        <div className='col-sm-6 col-xl-4'>
          <Card5
            image='/media/svg/brand-logos/reddit.svg'
            title='Reddit Awards'
            description='2.1M'
            status='up'
            statusValue={46.7}
            statusDesc='more adds'
            progress={0.0}
            progressType='Retention'
          />
        </div>
      </div>
    </div>
  )
}
