import jfRequest from './request/index'

export function getPageData() {
  return jfRequest.get({
    url: '/beike/api/powerscreen'
  })
}