import {request} from './request'

export function getProduct() {
  return request({
    url: '/products'
  })
}

export function getCommenttop() {
  return request({
    url: '/products/commenttop'
  })
}

export function getUpdatetime() {
  return request({
    url: '/products/updatetime'
  })
}
