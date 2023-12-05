import { Formik, type FormikProps, Form } from 'formik';

import { InputField } from './InputField';
import { InputFileField } from './InputFileUpload';
import Spinner from './assets/spinner.gif';

const initialFormData = {
  name: '',
  description: '',
  file: File || null
};

interface IFormProps {
  onSubmit: (value: typeof initialFormData) => void;
}

export const UserCodeUploadForm: React.FC<IFormProps> = ({
  onSubmit,
}) => {
  return (
    <div className="flex items-center">
      <Formik
        initialValues={initialFormData}
        onSubmit={onSubmit}
      >
        {({ isSubmitting, isValid, setFieldValue }: FormikProps<typeof initialFormData>) => (
          <Form className="flex flex-col md:flex-row w-full rounded-lg">
            <div className="w-full md:w-1/2 py-10 md:py-20 px-8 sm:px-20 md:px-14 md:py-32 bg-[#fff]">
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-center mb-3">
                Upload your solution
              </h2>
              <p className="text-center mb-3 font-medium">Enter your credit details below</p>
              <InputField
                name="name"
                placeholder="name"
              />
              <InputField
                name="description"
                placeholder="Description"
              />
              <InputFileField
                name="user_code"
                required
                handelChange={setFieldValue}
                labelname="Your Code(only .js files)"
              />
              <button
                disabled={isSubmitting || !isValid}
                type="submit"
                className="relative m-auto block bg-[#0090a8] py-3 px-11 rounded-full text-[#dae5ea] font-medium disabled:opacity-40"
              >
                SUBMIT
                {isSubmitting && <img src={Spinner} alt="" className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />}
              </button>
              </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};
