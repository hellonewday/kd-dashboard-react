import axios from 'axios'
import React, {useEffect, useState} from 'react'
import {Link} from 'react-router-dom'
import {on} from 'stream'
import {KTSVG} from '../../_metronic/helpers'
import {Card5} from '../../_metronic/partials/content/cards/Card5'

export function MyPage() {
  const [data, setData] = useState([])
  const [profileData, setProfile] = useState([])
  const [keyword, setKeyword] = useState('')
  useEffect(() => {
    axios
      .get('https://rok-dashboard-api.herokuapp.com/reports/person/12291500')
      .then((response) => {
        setData(response.data.result) // only for charts
        let dataReceived = response.data.result.reverse()
        setProfile(dataReceived)
      })
      .catch((error) => {
        setData([])
      })
  }, [])

  const onGovIdChange = (e: any) => {
    setKeyword(e.target.value)
    console.log(e.target.value)
  }

  const onSubmit = (e: any) => {
    e.preventDefault()
    setProfile([])
    setData([])
    axios
      .get('https://rok-dashboard-api.herokuapp.com/reports/person/' + keyword)
      .then((response) => {
        setData(response.data.result) // only for charts
        let dataReceived = response.data.result.reverse()
        setProfile(dataReceived)
      })
      .catch((error) => {
        setData([])
      })
  }

  const numberWithCommas = (x: number) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  }

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
            onChange={(e) => onGovIdChange(e)}
            className='form-control form-control-white form-control-sm w-200px ps-9'
            placeholder='Governor Id'
          />
        </div>
        <a href='#' className='btn btn-primary btn-sm' onClick={(e) => onSubmit(e)}>
          Search
        </a>
      </div>
      <div className='separator my-10'></div>
      {data.length > 0 && profileData.length > 0 ? (
        <>
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
                  <span className='fw-bolder fs-6 text-dark'>
                    {data[0]['data'][0]['governor_id']}
                  </span>
                </div>
              </div>

              <div className='row mb-7'>
                <label className='col-lg-4 fw-bold text-muted'>Governor Name</label>

                <div className='col-lg-8 fv-row'>
                  <span className='fw-bold fs-6'>{profileData[0]['data'][0]['governor_name']}</span>
                </div>
              </div>

              <div className='row mb-7'>
                <label className='col-lg-4 fw-bold text-muted'>Kingdom</label>

                <div className='col-lg-8 d-flex align-items-center'>
                  <span className='fw-bolder fs-6 me-2'>
                    {profileData[0]['data'][0]['kingdom']}
                  </span>

                  <span className='badge badge-success'>Verified</span>
                </div>
              </div>

              <div className='row mb-7'>
                <label className='col-lg-4 fw-bold text-muted'>Alliance</label>

                <div className='col-lg-8'>
                  <a href='#' className='fw-bold fs-6 text-dark text-hover-primary'>
                    {profileData[0]['data'][0]['alliance']}
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className='row g-6 g-xl-9'>
            <div className='col-sm-6 col-xl-4'>
              <Card5
                image='/media/svg/brand-logos/twitch.svg'
                title='Power'
                description={numberWithCommas(profileData[0]['data'][0]['power'])}
                status={
                  profileData[0]['data'][0]['power'] > profileData[1]['data'][0]['power']
                    ? 'up'
                    : 'down'
                }
                statusValue={numberWithCommas(
                  Math.abs(profileData[0]['data'][0]['power'] - profileData[1]['data'][0]['power'])
                )}
                statusDesc='power'
                progress={''}
                progressType=''
              />
            </div>
            <div className='col-sm-6 col-xl-4'>
              <Card5
                image='/media/svg/brand-logos/twitter.svg'
                title='Kill points'
                description={numberWithCommas(profileData[0]['data'][0]['kill_points'])}
                status={
                  profileData[0]['data'][0]['kill_points'] >
                  profileData[1]['data'][0]['kill_points']
                    ? 'up'
                    : 'down'
                }
                statusValue={numberWithCommas(
                  Math.abs(
                    profileData[0]['data'][0]['kill_points'] -
                      profileData[1]['data'][0]['kill_points']
                  )
                )}
                statusDesc='enemies troops'
                progress={''}
                progressType=''
              />
            </div>
            <div className='col-sm-6 col-xl-4'>
              <Card5
                image='/media/svg/brand-logos/spotify.svg'
                title='Dead troops'
                description={numberWithCommas(profileData[0]['data'][0]['dead'])}
                status={
                  profileData[0]['data'][0]['dead'] >= profileData[1]['data'][0]['dead']
                    ? 'up'
                    : 'down'
                }
                statusValue={numberWithCommas(
                  Math.abs(profileData[0]['data'][0]['dead'] - profileData[1]['data'][0]['dead'])
                )}
                statusDesc='troops has died on battlefield'
                progress={''}
                progressType=''
              />
            </div>
            <div className='col-sm-6 col-xl-4'>
              <Card5
                image='/media/svg/brand-logos/pinterest-p.svg'
                title='Tier 1 troops Killed'
                description={numberWithCommas(profileData[0]['data'][0]['tier_1'])}
                status={
                  profileData[0]['data'][0]['tier_1'] >= profileData[1]['data'][0]['tier_1']
                    ? 'up'
                    : 'down'
                }
                statusValue={numberWithCommas(
                  Math.abs(
                    profileData[0]['data'][0]['tier_1'] - profileData[1]['data'][0]['tier_1']
                  )
                )}
                statusDesc='troops killed'
                progress={''}
                progressType=''
              />
            </div>
            <div className='col-sm-6 col-xl-4'>
              <Card5
                image='/media/svg/brand-logos/github.svg'
                title='Tier 2 troops Killed'
                description={numberWithCommas(profileData[0]['data'][0]['tier_2'])}
                status={
                  profileData[0]['data'][0]['tier_2'] >= profileData[1]['data'][0]['tier_2']
                    ? 'up'
                    : 'down'
                }
                statusValue={numberWithCommas(
                  Math.abs(
                    profileData[0]['data'][0]['tier_2'] - profileData[1]['data'][0]['tier_2']
                  )
                )}
                statusDesc='troops killed'
                progress={''}
                progressType=''
              />
            </div>
            <div className='col-sm-6 col-xl-4'>
              <Card5
                image='/media/svg/brand-logos/youtube-play.svg'
                title='Tier 3 troops Killed'
                description={numberWithCommas(profileData[0]['data'][0]['tier_3'])}
                status={
                  profileData[0]['data'][0]['tier_3'] >= profileData[1]['data'][0]['tier_3']
                    ? 'up'
                    : 'down'
                }
                statusValue={numberWithCommas(
                  Math.abs(
                    profileData[0]['data'][0]['tier_3'] - profileData[1]['data'][0]['tier_3']
                  )
                )}
                statusDesc='troops killed'
                progress={''}
                progressType=''
              />
            </div>
            <div className='col-sm-6 col-xl-4'>
              <Card5
                image='/media/svg/brand-logos/telegram.svg'
                title='Tier 4 troops Killed'
                description={numberWithCommas(profileData[0]['data'][0]['tier_4'])}
                status={
                  profileData[0]['data'][0]['tier_4'] >= profileData[1]['data'][0]['tier_4']
                    ? 'up'
                    : 'down'
                }
                statusValue={numberWithCommas(
                  Math.abs(
                    profileData[0]['data'][0]['tier_4'] - profileData[1]['data'][0]['tier_4']
                  )
                )}
                statusDesc='troops killed'
                progress={''}
                progressType=''
              />
            </div>
            <div className='col-sm-6 col-xl-4'>
              <Card5
                image='/media/svg/brand-logos/reddit.svg'
                title='Tier 5 troops Killed'
                description={numberWithCommas(profileData[0]['data'][0]['tier_5'])}
                status={
                  profileData[0]['data'][0]['tier_5'] >= profileData[1]['data'][0]['tier_5']
                    ? 'up'
                    : 'down'
                }
                statusValue={numberWithCommas(
                  Math.abs(
                    profileData[0]['data'][0]['tier_5'] - profileData[1]['data'][0]['tier_5']
                  )
                )}
                statusDesc='troops killed'
                progress={''}
                progressType=''
              />
            </div>
          </div>
        </>
      ) : (
        <div></div>
      )}
    </div>
  )
}
