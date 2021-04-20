import { to, isValidArray } from '@/library/utils'
import { message } from 'antd'
import { ILabel } from '@/components/tag/interface'
import { IUpDownType } from '@/modules/labelCenter/types/labelGraph'
import qs from 'qs'

export const getLabelCategory = async () => {
  const [err, res] = await to(window.apis.getLabelCategory())
  if (err) {
    return
  }
  if (Object.is(res?.code, 0)) {
    return res.data
  } else {
    res?.msg && message.error(res.msg)
    return null
  }
}

export const getLabelSelect = async () => {
  const [err, res] = await to(window.apis.getLabelSelect())
  if (err) {
    return
  }
  if (Object.is(res?.code, 0)) {
    return res.data
  } else {
    res?.msg && message.error(res.msg)
    return null
  }
}

export const getBasicPage = async (
  limit: number,
  page: number,
  category?: string[] | undefined,
  labelName?: string
) => {
  let params: any = {}
  if (labelName) {
    params = { ...params, labelName }
  }
  if (category && isValidArray(category)) {
    params = {
      ...params,
      categoryLv1: category[0],
      categoryLv2: category[1],
      categoryLv3: category[2]
    }
  }
  const [err, res] = await to(
    window.apis.getBasicPage({
      params: { ...params, limit, page }
    })
  )
  if (err) {
    return
  }
  if (Object.is(res?.code, 0)) {
    return res.data
  } else {
    res?.msg && message.error(res.msg)
    return null
  }
}

export const getExtPage = async (
  limit: number,
  page: number,
  category?: string[] | undefined,
  labelName?: string
) => {
  let params: any = {}
  if (labelName) {
    params = { ...params, labelName }
  }
  if (category && isValidArray(category)) {
    params = {
      ...params,
      categoryLv1: category[0],
      categoryLv2: category[1],
      categoryLv3: category[2]
    }
  }
  const [err, res] = await to(
    window.apis.getExtPage({
      params: { ...params, limit, page }
    })
  )
  if (err) {
    return
  }
  if (Object.is(res?.code, 0)) {
    return res.data
  } else {
    res?.msg && message.error(res.msg)
    return null
  }
}

export const getSearchTotal = async (
  category?: string[] | undefined,
  labelName?: string
) => {
  if (!labelName) {
    return
  }
  let params: any = {}
  if (labelName) {
    params = { ...params, labelName }
  }
  if (category && isValidArray(category)) {
    params = {
      ...params,
      categoryLv1: category[0],
      categoryLv2: category[1],
      categoryLv3: category[2]
    }
  }

  const [err, res] = await to(
    window.apis.getSearchTotal({
      params
    })
  )
  if (err) {
    return
  }
  if (Object.is(res?.code, 0)) {
    return res.data
  } else {
    res?.msg && message.error(res.msg)
    return null
  }
}

export const getLabelDetail = async (
  id: number, // 指标id
  labelType: ILabel // 指标类型
) => {
  const [err, res] = await to(
    window.apis.getLabelDetail({
      params: {
        id,
        labelType
      }
    })
  )
  if (err) {
    return
  }
  if (Object.is(res?.code, 0)) {
    return res.data
  } else {
    res?.msg && message.error(res.msg)
    return null
  }
}

export const getLabelDims = async (
  id: number // 此处是计算/基础指标id 派生指标是子指标
) => {
  const [err, res] = await to(
    window.apis.getLabelDims({
      params: {
        id
      }
    })
  )
  if (err) {
    return
  }
  if (Object.is(res?.code, 0)) {
    return res.data
  } else {
    res?.msg && message.error(res.msg)
    return null
  }
}

export const getBaseByDim = async ({
  parentId,
  dimDateId,
  dimChannelId,
  dimProductId
}: any) => {
  let params: any = { parentId, dimDateId }
  if (dimChannelId) {
    params = { ...params, dimChannelId }
  }
  if (dimProductId) {
    params = { ...params, dimProductId }
  }
  const [err, res] = await to(
    window.apis.getBaseByDim({
      params
    })
  )
  if (err) {
    return
  }
  if (Object.is(res?.code, 0)) {
    return res.data
  } else {
    res?.msg && message.error(res.msg)
    return null
  }
}

export const getGraphSelect = async () => {
  const [err, res] = await to(window.apis.getGraphSelect())
  if (err) {
    return
  }
  if (Object.is(res?.code, 0)) {
    return res.data
  } else {
    res?.msg && message.error(res.msg)
    return null
  }
}

export const getGraphList = async (basicId: number) => {
  const [err, res] = await to(window.apis.getGraphList({ params: { basicId } }))
  if (err) {
    return
  }
  if (Object.is(res?.code, 0)) {
    return res.data
  } else {
    res?.msg && message.error(res.msg)
    return null
  }
}

export const getGraphDetail = async (id: number) => {
  const [err, res] = await to(window.apis.getGraphDetail({ params: { id } }))
  if (err) {
    return
  }
  if (Object.is(res?.code, 0)) {
    return res.data
  } else {
    res?.msg && message.error(res.msg)
    return null
  }
}

export const getGraphResult = async (
  basicLabelId: number,
  beginDate: string,
  endDate: string,
  dateDimId: string | number,
  productDimIds?: number[],
  channelDimIds?: number[]
) => {
  const params = Object.create(null)
  params.basicLabelId = basicLabelId
  params.beginDate = beginDate
  params.endDate = endDate
  params.dateDimId = dateDimId
  if (productDimIds) {
    params.productDimIds = productDimIds
  }
  if (channelDimIds) {
    params.channelDimIds = channelDimIds
  }

  const [err, res] = await to(
    window.apis.getGraphResult({
      params,
      paramsSerializer: params => qs.stringify(params, { indices: false })
    })
  )
  if (err) {
    return
  }
  if (Object.is(res?.code, 0)) {
    return res.data
  } else {
    res?.msg && message.error(res.msg)
    return null
  }
}

export const getGraphChangeLevel = async (
  basicLabelId: number,
  beginDate: string,
  endDate: string,
  changeType: IUpDownType,
  dateDimId: string | number,
  productDimIds?: number[],
  channelDimIds?: number[]
) => {
  const params = Object.create(null)
  params.basicLabelId = basicLabelId
  params.beginDate = beginDate
  params.endDate = endDate
  params.dateDimId = dateDimId
  params.changeType = changeType
  if (productDimIds) {
    params.productDimIds = productDimIds
  }
  if (channelDimIds) {
    params.channelDimIds = channelDimIds
  }
  const [err, res] = await to(
    window.apis.getGraphChangeLevel({
      params,
      paramsSerializer: params => qs.stringify(params, { indices: false })
    })
  )
  if (err) {
    return
  }
  if (Object.is(res?.code, 0)) {
    return res.data
  } else {
    res?.msg && message.error(res.msg)
    return null
  }
}

export const getGraphAgainResult = async (id: number) => {
  const [err, res] = await to(window.apis.getGraphAgainResult({ params: { id } }))
  if (err) {
    return
  }
  if (Object.is(res?.code, 0)) {
    return res.data
  } else {
    res?.msg && message.error(res.msg)
    return null
  }
}

export const getGraphLabelDetail = async (id: number) => {
  const [err, res] = await to(window.apis.getGraphLabelDetail({ params: { id } }))
  if (err) {
    return
  }
  if (Object.is(res?.code, 0)) {
    return res.data
  } else {
    res?.msg && message.error(res.msg)
    return null
  }
}
