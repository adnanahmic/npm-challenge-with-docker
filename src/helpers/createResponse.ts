import { ICreateResponse } from '../dto/createResponse'
const createResponse = ({
  res,
  status,
  innerStatus,
  message,
  responseData,
}: ICreateResponse) => {
  let data = null
  if (responseData) data = responseData
  return res.status(status).json({
    success: innerStatus,
    message,
    data,
  })
}

export { createResponse }
