import React from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import { connect } from 'react-redux'
import { createHeroThunk } from '../../store/slices/heroesSlice'

function HeroForm ({ createHero }) {
  const initialValues = {
    nickname: '',
    realName: '',
    originDescription: '',
    catchPhrase: '',
    isGood: true,
    heroPhoto: ''
  }

  const handleSubmit = (values, formikBag) => {
    // js-object => application/json => req.body
    // createHero(values)

    // formData (с files) => multipart/form-data
    const formData = new FormData()
    // multer: formData(text) => req.body
    formData.append('nickname', values.nickname)
    formData.append('realName', values.realName)
    formData.append('originDescription', values.originDescription)
    formData.append('catchPhrase', values.catchPhrase)
    formData.append('isGood', values.isGood)
    // multer: formData(file) => req.file
    formData.append('heroPhoto', values.heroPhoto)

    createHero(formData)
    formikBag.resetForm()
  }

  return (
    <Formik initialValues={initialValues} onSubmit={handleSubmit}>
      {formikProps => (
        <Form>
          <label>
            <span>Nickname:</span>
            <Field type='text' name='nickname' placeholder='Nickname' />
          </label>
          <br />
          <label>
            <span>Real name:</span>
            <Field type='text' name='realName' placeholder='Real Name' />
          </label>
          <br />
          <label>
            <span>Origin:</span>
            <Field type='text' name='originDescription' placeholder='Origin' />
          </label>
          <br />
          <label>
            <span>Catch phrase:</span>
            <Field type='text' name='catchPhrase' placeholder='Catch phrase' />
          </label>
          <br />
          <label>
            <Field type='checkbox' name='isGood' />
            <span>Is hero positive</span>
            <br />
          </label>
          <label>
            <span>Hero photo:</span>
            <input
              type='file'
              name='heroPhoto'
              onChange={e => {
                formikProps.setFieldValue('heroPhoto', e.target.files[0])
              }}
            />
          </label>
          <button type='submit'>Create</button>
        </Form>
      )}
    </Formik>
  )
}

const mapStateToProps = ({ heroData }) => heroData

const mapDispatchToProps = dispatch => ({
  createHero: data => dispatch(createHeroThunk(data))
})

export default connect(mapStateToProps, mapDispatchToProps)(HeroForm)
