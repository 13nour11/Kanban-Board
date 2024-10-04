import { useFormik } from "formik";
import React, { useContext, useState, useEffect, useMemo } from "react";
import * as Yup from "yup";
import { MemberContext } from "../../Context/MemberContext";
import { FormValues, Inputs, MemberData } from "../../interfaces/interfaces";

export default function FormSection() {
  const formInputs: Inputs[] = useMemo(
    () => [
      { id: 1, label: "Title", name: "title", type: "text" },
      { id: 2, label: "Name", name: "name", type: "text" },
      { id: 3, label: "Age", name: "age", type: "number" },
      { id: 4, label: "Email", name: "email", type: "email" },
      { id: 5, label: "Phone", name: "phone", type: "text" },
    ],
    []
  );

  const {
    addMember,
    memberDataForUpdate,
    setMemberDataForUpdate,
    updateMember,
    formShow,
    setFormShow,
    boardShow,
    setBoardShow,
  } = useContext(MemberContext) || {
    addMember: () => {},
    updateMember: () => {},
    setMemberDataForUpdate: React.Dispatch<
      React.SetStateAction<MemberData | undefined>
    >,
    formShow: false,
    setFormShow: () => {},
    boardShow: true,
    setBoardShow: () => {},
  };

  const [initialValuesForUpdate, setInitialValuesForUpdate] = useState<
    FormValues | undefined
  >();

  useEffect(() => {
    if (memberDataForUpdate) {
      setInitialValuesForUpdate({
        name: memberDataForUpdate.name,
        phone: memberDataForUpdate.phone,
        email: memberDataForUpdate.email,
        title: memberDataForUpdate.title,
        age: memberDataForUpdate.age,
        status: memberDataForUpdate.status || "Unclaimed",
      });
      setFormShow(true);
      setBoardShow(false); // Hide the board when form is shown for update
    }
  }, [memberDataForUpdate, setFormShow, setBoardShow]);

  const formValidation = useMemo(
    () =>
      Yup.object().shape({
        title: Yup.string()
          .min(2, "Title must be at least 2 characters long")
          .required("Title is required"),
        name: Yup.string()
          .min(3, "Name must be at least 3 characters long")
          .max(25, "Name must be at most 25 characters long")
          .required("Name is required"),
        phone: Yup.string()
          .matches(
            /^\+?[1-9]\d{0,14}$/,
            "Phone number must be in the format: +[country code][number]"
          )
          .required("Phone number is required"),
        email: Yup.string()
          .email("Invalid Email Address")
          .required("Email is required"),
        age: Yup.number()
          .typeError("Age must be a number")
          .min(1, "Age must be greater than 0")
          .max(60, "Age must be less than or equal to 60")
          .required("Age is required"),
      }),
    []
  );

  function resetFormValues(formValues: FormValues) {
    formValues.age = 0;
    formValues.email = "";
    formValues.name = "";
    formValues.phone = "";
    formValues.title = "";
    formValues.status = "Unclaimed";
  }

  const handleSubmit = (formValues: FormValues) => {
    if (memberDataForUpdate) {
      updateMember(memberDataForUpdate.id, {
        ...formValues,
        id: memberDataForUpdate.id,
      });
      setMemberDataForUpdate(undefined);
    } else {
      addMember({ ...formValues, id: Date.now() });
    }

    resetFormValues(formValues);
    formik.resetForm();
  };

  const formik = useFormik({
    initialValues: initialValuesForUpdate || {
      name: "",
      phone: "",
      email: "",
      title: "",
      age: 0,
      status: "Unclaimed",
    },
    enableReinitialize: true,
    validationSchema: formValidation,
    onSubmit: handleSubmit,
  });

  if (!formShow) {
    return null; // Hide the form if not supposed to show
  }

  if (boardShow) {
    return null; // If the board is shown, hide the form
  }

  return (
    <section className="h-full">
      <div className="flex justify-center items-center">
        <div className="w-full max-w-xl h-full border border-teal-300 shadow-md rounded-lg p-5">
          <header>
            <h2 className="font-semibold text-2xl md:text-4xl text-center py-1 text-teal-300 my-2">
              Book Now !
            </h2>
          </header>
          <article className="py-3 h-full ">
            <form onSubmit={formik.handleSubmit}>
              {formInputs.map((input) => (
                <div key={input.id}>
                  <div className="flex flex-col gap-2">
                    <label
                      htmlFor={input.name}
                      className="text-teal-300 md:text-lg block my-2 md:m-0"
                    >
                      {input.label}
                    </label>

                    <input
                      value={formik.values[input.name as keyof FormValues]}
                      type={input.type}
                      id={input.name}
                      name={input.name}
                      className=" p-2 border rounded-md text-black focus:outline-none focus:border-2 focus:border-yellow-300"
                      onBlur={formik.handleBlur}
                      onChange={formik.handleChange}
                    />

                    {formik.errors[input.name as keyof FormValues] &&
                    formik.touched[input.name as keyof FormValues] ? (
                      <div
                        className="my-1 p-2 text-sm text-red-800 rounded-lg bg-red-50"
                        role="alert"
                      >
                        {formik.errors[input.name as keyof FormValues]}
                      </div>
                    ) : null}
                  </div>
                </div>
              ))}

              <div className="w-full flex justify-center mt-5">
                <button
                  type="submit"
                  className="btnStyle px-5 py-2 rounded-md w-full "
                >
                  Submit
                </button>
              </div>
            </form>
          </article>
        </div>
      </div>
    </section>
  );
}
