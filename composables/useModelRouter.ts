export default function () {
  const stateStore = useStateStore()
  const caseModelResponse = useCaseModelResponse()
  const storyModelResponse = useStoryModelResponse()
  const testModelResponse = useTestModelResponse()
  const actModelResponse = useActModelResponse()
  const rateModelResponse = useRateModelResponse()
  const faceModelResponse = useFaceModelResponse()
  const caseStore = useCaseStore()

  function getModelParams(
    messages: MessagesArray,
    watchFields: string[],
    responseFormat: ResponseFormatType = { type: 'json_object' }
  ) {
    const modelParams: ModelParamsType = {
      models: stateStore.models,
      messages: messages,
      watchFields: watchFields,
      responseFormat: responseFormat,
    }

    return modelParams
  }

  async function getCase(messages: MessagesArray) {
    const params = getModelParams(messages, caseStore.caseContentFields)
    return await caseModelResponse.getResponse(params)
  }

  async function getStory(messages: MessagesArray) {
    const params = getModelParams(messages, caseStore.caseStoryFields)
    return await storyModelResponse.getResponse(params)
  }

  async function getTest(messages: MessagesArray) {
    const params = getModelParams(messages, caseStore.caseTestFields)
    return await testModelResponse.getResponse(params)
  }

  async function getAct(messages: MessagesArray) {
    const params = getModelParams(messages, [], { type: 'text' })
    return await actModelResponse.getResponse(params)
  }

  async function getRate(messages: MessagesArray) {
    const params = getModelParams(messages, [], { type: 'text' })
    return await rateModelResponse.getResponse(params)
  }

  async function getFaceUrl() {
    return await faceModelResponse.getResponse()
  }

  async function getPoseId() {
    stateStore.modelResponseField = '视频'
    const response: BigmodelCogvideoxResponse = await $fetch(
      'https://open.bigmodel.cn/api/paas/v4/videos/generations',
      {
        method: 'POST',
        headers: {
          Authorization: 'Bearer ' + import.meta.env.VITE_BIGMODEL_API_KEY,
        },
        body: {
          model: 'cogvideox-flash',
          prompt: '表情痛苦',
          image_url: `${caseStore.caseFaceUrl}`,
        },
      }
    )
    return response.id
  }

  async function getPose() {
    stateStore.modelResponseField = '获取视频'
    const response: BigmodelCogvideoxResponse = await $fetch(
      `https://open.bigmodel.cn/api/paas/v4/async-result/${caseStore.casePoseId}`,
      {
        method: 'GET',
        headers: {
          Authorization: 'Bearer ' + import.meta.env.VITE_BIGMODEL_API_KEY,
        },
      }
    )
    if (response.video_result) {
      return response.video_result[0].url
    } else {
      return ''
    }
  }

  return { getCase, getStory, getTest, getAct, getRate, getFaceUrl, getPoseId, getPose }
}
