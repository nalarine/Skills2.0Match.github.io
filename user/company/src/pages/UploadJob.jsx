import { useState, useEffect } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { CustomButton, JobCard, JobTypes, TextInput } from '../components'
import { jobs } from '../utils/data'
import { apiRequest } from '../utils'
import { Link, useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { BsArrowLeft } from 'react-icons/bs'
import FroalaEditor from 'froala-editor'
import 'froala-editor/js/plugins/lists.min.js'
import FroalaEditorComponent from 'react-froala-wysiwyg'
import 'froala-editor/css/froala_editor.pkgd.min.css'
import philippines from 'philippines'
import Dropdown from '../components/Dropdown'
import DropdownCategories from '../components/DropdownCategories'
import { jobCategories } from '../utils/data'

const UploadJob = () => {
  const { id } = useParams()
  const { user } = useSelector((state) => state.user)
  const {
    register,
    handleSubmit,
    getValues,
    watch,
    setValue,
	control,
    formState: { errors },
  } = useForm({
    mode: 'onChange',
    defaultValues: {},
  })

  const [errMsg, setErrMsg] = useState('')
  const [jobType, setJobType] = useState('Full-Time')
  const [isLoading, setIsLoading] = useState(false)
  const [recentPost, setRecentPost] = useState([])
  const [requirementsText, setRequirementsText] = useState('')
  const [locationRegion, setLocationRegion] = useState(philippines.regions[0])
  const [locationProvince, setLocationProvince] = useState(
    philippines.provinces[0],
  )
  const [locationCity, setLocationCity] = useState(philippines.cities[5])
  const [salaryPeriod, setSalaryPeriod] = useState('hour') // State to hold selected salary period
  const [jobCategory, setJobCategory] = useState('') // State to hold selected job category
  const [jobSubcategory, setJobSubcategory] = useState('') // State to hold selected job subcategory

  const minimumSalary = salaryPeriod === 'hour' ? 50 : 400

  const categories = jobCategories.map((category) => category.category)
  const subcategories =
    jobCategories.find((category) => category.category === jobCategory)
      ?.subcategories || []

  const onChangeLocationRegion = (v) => {
    const defaultProvince = philippines.provinces.filter(
      (province) => province.region == v.key,
    )[0]
    const defaultCity = philippines.cities.filter(
      (city) => city.province == defaultProvince.key,
    )[0]
    setLocationRegion(v)
    setLocationProvince(defaultProvince)
    setLocationCity(defaultCity)
  }
  const onChangeLocationProvince = (v) => {
    const defaultCity = philippines.cities.filter(
      (city) => city.province == v.key,
    )[0]
    setLocationProvince(v)
    setLocationCity(defaultCity)
  }

  const onSubmit = async (data) => {
    setIsLoading(true)
    setErrMsg(null)
    data.requirements = requirementsText
    data.location = `${locationRegion.name} ${locationProvince.name} ${locationCity.name}`
    data.jobLocationRegion = locationRegion.key
    data.jobLocationProvince = locationProvince.key
    data.jobLocationCity = locationCity.name
    data.startHiringDate = new Date(data.startHiringDate)
    data.endHiringDate = new Date(data.endHiringDate)
    data.salaryPeriod = salaryPeriod // Add salary period to form data

    const newData = { ...data, jobType: jobType }

    try {
      const res = await apiRequest({
        url: id ? '/jobs/update-job/' + id : '/jobs/upload-job',
        token: user?.token,
        data: newData,
        method: id ? 'PUT' : 'POST',
      })

      if (res.status === 'failed') {
        setErrMsg({ ...res })
      } else {
        setErrMsg({ status: 'success', message: res.message })
        setTimeout(() => {
          window.location.reload()
        }, 2000)
      }
      setIsLoading(false)
    } catch (error) {
      console.log(error)
      setIsLoading(false)
    }
  }
  const getRecentPost = async () => {
    try {
      const id = user?._id

      const res = await apiRequest({
        url: '/companies/get-company/' + id,
        method: 'GET',
      })

      setRecentPost(res?.data?.jobPosts)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getRecentPost()
    // Rich Text Editor for Skills Requirement
    new FroalaEditor('textarea#froala-editor', {
      listAdvancedTypes: true,
	  enter: false,
    })
  }, [])

  useEffect(() => {
    if (id) {
      const getJobDetails = async () => {
        try {
          const { data } = await apiRequest({
            url: '/jobs/get-job-detail/' + id,
            method: 'GET',
          })

          Object.keys(data).map((key) => {
            setValue(key, data[key])
          })
          setValue(
            'startHiringDate',
            new Date(data.startHiringDate).toISOString().split('T')[0],
          )
          setValue(
            'endHiringDate',
            new Date(data.endHiringDate).toISOString().split('T')[0],
          )
          setJobType(data.jobType)
          if (data.jobLocationRegion) {
            const region = philippines.regions.filter(
              (region) => region.key == data.jobLocationRegion,
            )[0]
            setLocationRegion(region)
          }
          if (data.jobLocationProvince) {
            const province = philippines.provinces.filter(
              (province) => province.key == data.jobLocationProvince,
            )[0]
            setLocationProvince(province)
          }
          if (data.jobLocationCity) {
            const city = philippines.cities.filter(
              (city) => city.name == data.jobLocationCity,
            )[0]
            setLocationCity(city)
          }
          setSalaryPeriod(data.salaryPeriod)
          setValue('desc', data.detail[0].desc)
          setRequirementsText(data.detail[0].requirements)
        } catch (error) {
          console.log(error)
        }
      }

      getJobDetails()
    }
  }, [id])

  return (
    <div className="container mx-auto flex flex-col md:flex-row gap-8 2xl:gap-14 bg-[#f7fdfd] px-5">
      <div className="w-full h-fit md:w-2/3 2xl:2/4 bg-white px-5 py-10 md:px-10 shadow-md">
        <div>
          <Link
            to="/CompanyDash"
            className="absolute top-0 left-0 mt-4 ml-16 flex items-center"
          >
            <button className="text-black text-sm bg-transparent border border-black px-3 py-1 rounded-md transition-colors duration-300 hover:text-white hover:bg-green-500 hover:border-transparent flex items-center">
              <BsArrowLeft className="mr-2" />
              Back
            </button>
          </Link>
          <p className="text-gray-500 font-semibold text-2xl">Job Post</p>

          <form
            className="w-full mt-2 flex flex-col gap-8"
            onSubmit={handleSubmit(onSubmit)}
          >
            <TextInput
              name="jobTitle"
              label="Job Title"
              placeholder="eg. Software Engineer"
              type="text"
              required={true}
              register={register('jobTitle', {
                required: 'Job Title is required',
              })}
              error={errors.jobTitle ? errors.jobTitle?.message : ''}
            />

            <div className="w-full flex gap-4">
              <div className="w-1/2">
                <TextInput
                  name="startHiringDate"
                  label="Start Hiring Date"
                  placeholder="Select Date"
                  type="date"
                  min={new Date().toISOString().split('T')[0]} // Set min attribute to today's date
                  register={register('startHiringDate', {
                    required: 'Start Hiring Date is required',
                  })}
                  error={
                    errors.startHiringDate
                      ? errors.startHiringDate?.message
                      : ''
                  }
                />
              </div>

              <div className="w-1/2">
                <TextInput
                  name="endHiringDate"
                  label="End Hiring Date"
                  placeholder="Select Date"
                  type="date"
                  min={new Date().toISOString().split('T')[0]} // Set min attribute to today's date
                  register={register('endHiringDate', {
                    required: 'End Hiring Date is required',
                  })}
                  error={
                    errors.endHiringDate ? errors.endHiringDate?.message : ''
                  }
                />
              </div>
            </div>

            <div className="w-full flex gap-4">
              <div className={`w-1/2 mt-2`}>
                <label className="text-gray-600 text-sm mb-1">Job Type</label>
                <JobTypes jobTitle={jobType} setJobTitle={setJobType} />
              </div>

              <div className="w-1/2">
                <TextInput
                  name="salary"
                  label="Salary (PHP)"
                  placeholder={`Enter not less than ${minimumSalary}`}
                  type="number"
                  min={minimumSalary} // Dynamic minimum salary
                  register={register('salary', {
                    required: 'Salary is required',
                    min: {
                      value: minimumSalary,
                      message: `Salary must be at least ${minimumSalary}`,
                    },
                  })}
                  error={errors.salary ? errors.salary?.message : ''}
                />
              </div>
              {/* Dropdown for salary period START */}
              <div className="flex flex-col">
                <label className="text-gray-600 text-sm mb-3">
                  Salary Period
                </label>
                <select
                  className="rounded border border-gray-400 focus:outline-none focus:border-lime-500 focus:ring-1 focus:ring-lime-500 text-base px-4 py-2"
                  value={salaryPeriod}
                  onChange={(e) => setSalaryPeriod(e.target.value)}
                >
                  <option value="hour">Hour</option>
                  <option value="day">Day</option>
                  <option value="week">Week</option>
                  <option value="month">Month</option>
                </select>
              </div>
              {/* Dropdown for salary period END */}
            </div>

            <div className="w-full flex gap-4">
              <div className="w-1/2 z-9999">
                <TextInput
                  name="vacancies"
                  label="No. of Vacancies"
                  placeholder="vacancies"
                  type="number"
                  register={register('vacancies', {
                    required: 'Vacancies is required!',
					min: {
						value: 1,
						message: 'Vacancies must be at least 1',
					}
                  })}
                  error={errors.vacancies ? errors.vacancies?.message : ''}
                />
              </div>

              <div className="w-1/2">
                <TextInput
                  name="experience"
                  label="Years of Experience"
                  placeholder="experience"
                  type="number"
                  register={register('experience', {
                    required: 'Experience is required',
                  })}
                  error={errors.experience ? errors.experience?.message : ''}
                />
              </div>
            </div>

            {/* <TextInput
              name='location'
              label='Job Location'
              placeholder='eg. New York'
              type='text'
              register={register("location", {
                required: "Job Location is required",
              })}
              error={errors.location ? errors.location?.message : ""}
            /> */}

            {/* Job Categories START */}
            <div className="flex flex-col">
              <label className="text-gray-600 text-sm mb-1">Job Category</label>
              <DropdownCategories
                selectedCategory={jobCategory}
                setSelectedCategory={setJobCategory}
                selectedSubcategory={jobSubcategory}
                setSelectedSubcategory={setJobSubcategory}
              />
            </div>

            {jobCategory && (
              <div className="flex flex-col">
                <label className="text-gray-600 text-sm mb-1">
                  Job Subcategory
                </label>
                <DropdownCategories
                  title={jobSubcategory}
                  setTitle={setJobSubcategory}
                  items={subcategories}
                  key="subcategories"
                />
              </div>
            )}

            <div className="flex flex-col">
              <label className="text-gray-600 text-sm mb-1">Job Region</label>
              <Dropdown
                title={locationRegion}
                setTitle={onChangeLocationRegion}
                items={philippines.regions}
                key="key"
              />
            </div>
            <div className="flex flex-col">
              <label className="text-gray-600 text-sm mb-1">Job Province</label>
              <Dropdown
                title={locationProvince}
                setTitle={onChangeLocationProvince}
                items={philippines.provinces.filter(
                  (province) => province.region == locationRegion.key,
                )}
                key="key"
              />
            </div>
            <div className="flex flex-col">
              <label className="text-gray-600 text-sm mb-1">Job City</label>
              <Dropdown
                title={locationCity}
                setTitle={setLocationCity}
                items={philippines.cities.filter(
                  (city) => city.province == locationProvince.key,
                )}
                key="name"
              />
            </div>
            <div className="flex flex-col">
			<label className="text-gray-600 text-sm mb-1">Job Description</label>
			<Controller
				name="desc"
				control={control}
				defaultValue=""
				rules={{
					required: 'Job Description is required!',
					minLength: {
						value: 50, // Minimum character limit
						message: 'Job Description must be at least 50 characters!',
					},
					maxLength: {
						value: 1000, // Maximum character limit
						message: 'Job Description must not exceed 500 characters!',
					},
				}}
				render={({ field }) => (
					<FroalaEditorComponent
						tag="textarea"
						model={field.value}
						onModelChange={field.onChange}
					/>
				)}
			/>
			{errors.desc && (
				<span role="alert" className="text-xs text-red-500 mt-0.5">
					{errors.desc?.message}
				</span>
			)}
		</div>

            <div className="flex flex-col">
              <label className="text-gray-600 text-sm mb-1">
                Skills Requirements
              </label>
              {/* <textarea
                id='froala-editor'
                className='rounded border border-gray-400 focus:outline-none focus:border-lime-500 focus:ring-1 focus:ring-lime-500 text-base px-4 py-2 resize-none'
                rows={4}
                cols={6}
                {...register("requirements")}
              ></textarea> */}
              <FroalaEditorComponent
                tag="textarea"
                model={requirementsText}
                onModelChange={setRequirementsText}
              />
            </div>

            {errMsg && (
              <span role="alert" className="text-sm text-red-500 mt-0.5">
                {errMsg}
              </span>
            )}
            <div className="mt-2">
              {isLoading ? (
                <Loading />
              ) : (
                <CustomButton
                  type="submit"
                  containerStyles="inline-flex justify-center rounded-md border border-transparent bg-lime-600 px-8 py-2 text-sm font-medium text-white hover:bg-[#1d4fd846] hover:text-[#1d4fd8] focus:outline-none "
                  title="Submit"
                />
              )}
            </div>
          </form>
        </div>
      </div>
      <div className="w-full md:w-1/3 2xl:2/4 p-5 mt-20 md:mt-0">
        <p className="text-gray-500 font-semibold">Recent Job Post</p>

        <div className="w-full flex flex-wrap gap-6">
          {recentPost &&
            recentPost.slice(0, 4).map((job, index) => {
              const data = {
                name: user?.name,
                email: user?.email,
                logo: user?.profileUrl,
                ...job,
              }
              return <JobCard job={data} key={index} />
            })}
        </div>
      </div>
    </div>
  )
}

export default UploadJob