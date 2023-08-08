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
    isGood: true
  }

  const handleSubmit = (values, formikBag) => {
    createHero(values)
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
