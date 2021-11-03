import React, {useCallback, useContext, useEffect, useState} from 'react'
import { CCard, CCardBody, CCardHeader, CCardFooter,
  CRow, CCol,
  CInput, CLabel, CFormGroup, CTextarea, CFormText,
  CButton } from "@coreui/react"
import CIcon from "@coreui/icons-react"
import Container1000 from "../../containers/Container1000"
import {useHistory} from "react-router-dom"
import Select from "react-select"
import ImageCropper from "../ImageCropper"
import ServerServiceContext from "../../contexts/ServerServiceContext"
import {useFirebase} from "react-redux-firebase";
import {useSelector} from "react-redux";
import {toast} from "react-toastify";
import WithBgSpinner from "../spinners/WithBgSpinner";
import {ERRORS} from "../../constants/errors";

const initialValidationErrors = {
  name: null,
  description: null,
  cost: null,
  category: null
}

function ProductForm({ product = null, isEdit = false }) {

  const history = useHistory()
  const serverService = useContext(ServerServiceContext)
  const firebase = useFirebase()

  const user = useSelector(state => state.auth.user)

  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  const [inputs, setInputs] = useState(initialInputs)
  const [validationErrors, setValidationErrors] = useState(initialValidationErrors)
  const [photoBlob, setPhotoBlob] = useState(null)

  useEffect(() => {
    if (product){
      setInputs({
        name: product.name,
        description: product.description,
        cost: product.cost,
      })
    }
  }, [product])

  const [currencies, setCurrencies] = useState([{ value: 'TL', label: 'TL' }])
  const [categories, setCategories] = useState([])
  const [subCategories, setSubCategories] = useState([])
  const [subSubCategories, setSubSubCategories] = useState([])

  const [selectedCurrency, setSelectedCurrency] = useState({ value: 'Tl', label: 'TL' })
  const [selectedCategory, setSelectedCategory] = useState('')
  const [selectedSubCategory, setSelectedSubCategory] = useState('')
  const [selectedSubSubCategory, setSelectedSubSubCategory] = useState('')

  const fetchCategories = useCallback(async () => {
    const result = await serverService.getCategories()

    if (!result.hasError){
      setCategories(result.data)
    }
  }, [])

  const fetchSubCategories = useCallback(async categoryId => {
    const result = await serverService.getSubCategories(categoryId)

    if (!result.hasError){
      setSubCategories(result.data)
    }
  }, [])

  const fetchSubSubCategories = useCallback(async subCategoryId => {
    const result = await serverService.getSubSubCategories(subCategoryId)

    if (!result.hasError){
      setSubSubCategories(result.data)
    }
  }, [])

  useEffect(() => {
    fetchCategories().then(() => {})
  }, [])

  useEffect(() => {
    if (selectedCategory){
      fetchSubCategories(selectedCategory.value).then(() => {})
    }
  }, [selectedCategory])

  useEffect(() => {
    if (selectedSubCategory){
      fetchSubSubCategories(selectedSubCategory.value).then(() => {})
    }
  }, [selectedSubCategory])

  const onInputsChange = useCallback(e => {
    setInputs(state => ({ ...state, [e.target.name]: e.target.value}))
    setValidationErrors(state => ({ ...state, [e.target.name]: null }))
  }, [])


  const onSubmit = useCallback(async () => {

    setIsLoading(true)

    const { name, description, cost } = inputs
    const adminName = user.name

    // validation
    if (!name || !cost || !selectedCategory.value || !cost.toString().length){
      const err = { ...initialValidationErrors }
      !name && (err.name = 'This field may not be blank')
      !selectedCategory.value && (err.category = 'Select category')
      !cost.toString().length && (err.cost = 'This field may not be blank')

      setValidationErrors(err)
      setIsLoading(false)
      window.scroll({ top: 0, left: 0, behavior: 'smooth' })
      return
    }

    let image = ''

    if (photoBlob) {
      const filename = name || Date.now().toString()

      await firebase
        .storage()
        .ref()
        .child(`${adminName}/${filename}.png`)
        .put(photoBlob)

      image = `https://firebasestorage.googleapis.com/v0/b/lefke-market.appspot.com/o/undefined%2F${filename}.png?alt=media`
    }

    const form = {
      name,
      description,
      category: selectedCategory.value || null,
      subcategory: selectedSubCategory.value || null,
      subsubcategory: selectedSubSubCategory.value || null,
      cost: cost || null,
      supplier: user.id,
      image: image,
    }

    console.log('form is: ', form)

    let result = {}

    if (isEdit){
      result = await serverService.updateProduct(product.id, form)
    } else {
      result = await serverService.createProduct(form)
    }

    if (!result.hasError){
      toast.success(isEdit ? 'Product successfully changed.' : 'Product successfully added.')
      history.push('/products')
    } else {
      setError(result.data.detail || ERRORS.SOMETHING_WENT_WRONG)
    }

    setIsLoading(false)
  }, [inputs, selectedCategory, selectedSubCategory, selectedSubCategory, selectedSubSubCategory, photoBlob, selectedCurrency])

  const onReset = useCallback(() => {
    if (product && isEdit){
      setInputs({
        name: product.name,
        description: product.description,
        cost: product.cost || '',
      })
      setPhotoBlob(null)
    } else {
      setInputs(initialInputs)
      setSelectedCategory('')
      setSelectedSubCategory('')
      setSelectedSubSubCategory('')
      setPhotoBlob(null)
    }
  }, [product])

  return (
    <>
      <Container1000>
        <CButton className="border mt-3" onClick={() => history.goBack()}>
          <CIcon name="cil-arrow-left" className="mr-1"/>
          Back
        </CButton>
        <hr/>
        <CRow className="my-3">
          <CCol md={12}>
            <CCard>
              <CCardBody className="py-2 px-3">
                <h4> {
                    isEdit ? `Item change "${product?.name}"` : `Item create`
                } </h4>
              </CCardBody>
            </CCard>
          </CCol>
          <CCol md={8}>
            <CCard>
              <CCardBody>
                <CFormGroup>
                  <CLabel htmlFor="pr-name">Name</CLabel>
                  <CInput
                    id="pr-name"
                    name="name"
                    autoComplete="pr-name"
                    value={inputs.name}
                    onChange={onInputsChange}
                    placeholder="Enter name of product..."
                    className={ validationErrors.name ? 'border-danger' : '' }
                  />
                  { validationErrors.name && <CFormText><span className="text-danger">{ validationErrors.name }</span></CFormText> }
                </CFormGroup>
                <CFormGroup>
                  <CLabel htmlFor="pr-description">Description</CLabel>
                  <CTextarea
                    id="pr-description"
                    name="description"
                    autoComplete="pr-description"
                    value={inputs.description}
                    onChange={onInputsChange}
                    placeholder="Enter product description..."
                    rows={4}
                    className={ validationErrors.description ? 'border-danger' : '' }
                  />
                  { validationErrors.description && <CFormText><span className="text-danger">{ validationErrors.description }</span></CFormText> }
                </CFormGroup>
                <CFormGroup>
                  <CLabel htmlFor="pr-cost">Cost</CLabel>
                  <CInput
                    type="number"
                    id="pr-cost"
                    name="cost"
                    autoComplete="pr-cost"
                    value={inputs.cost}
                    onChange={onInputsChange}
                    placeholder="Enter product cost..."
                    className={ validationErrors.cost ? 'border-danger' : '' }
                  />
                  { validationErrors.cost && <CFormText><span className="text-danger">{ validationErrors.cost }</span></CFormText> }
                </CFormGroup>

                <CFormGroup>
                  <CLabel htmlFor="pr-image">Photo</CLabel>
                  <ImageCropper setPhotoBlob={setPhotoBlob} id="pr-photo" />
                  {
                    !photoBlob && product?.image && <img src={product.image} width={200} alt="Product image"/>
                  }
                </CFormGroup>
              </CCardBody>
            </CCard>
          </CCol>
          <CCol md={4}>
            <CCard>
              <CCardBody>
                <CFormGroup>
                  <CLabel>Category</CLabel>
                  <Select
                    options={categories.map(c => ({ value: c.id, label: c.nameEn }))}
                    value={selectedCategory}
                    onChange={val => {
                      setSelectedCategory(val)
                      setValidationErrors(state => ({ ...state, category: null }))
                    }}
                    className={validationErrors.category ? 'border-danger' : ''}
                  />
                  { validationErrors.category && <CFormText><span className="text-danger">{ validationErrors.category }</span></CFormText> }
                </CFormGroup>
                <CFormGroup>
                  <CLabel>Subcategory</CLabel>
                  <Select
                    options={subCategories.map(c => ({ value: c.id, label: c.nameEn }))}
                    value={selectedSubCategory}
                    onChange={val => setSelectedSubCategory(val)}
                  />
                </CFormGroup>
                <CFormGroup>
                  <CLabel>Subsubcategory</CLabel>
                  <Select
                    options={subSubCategories.map(c => ({ value: c.id, label: c.nameEn }))}
                    value={selectedSubSubCategory}
                    onChange={val => setSelectedSubSubCategory(val)}
                  />
                </CFormGroup>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
        <hr/>
        <div className="d-flex justify-content-between mb-5">
          <CButton color="secondary" onClick={onReset}>Reset</CButton>
          <h5 className="text-danger">{ error }</h5>
          { isEdit ? <CButton color="success" onClick={onSubmit}>Change</CButton> : <CButton color="success" onClick={onSubmit}>Create</CButton> }
        </div>
      </Container1000>
      { isLoading && <WithBgSpinner/> }
    </>
  )
}

export default ProductForm

const initialInputs = {
  name: '',
  description: '',
  cost: '',
}
