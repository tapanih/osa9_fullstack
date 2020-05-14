import React from 'react';
import { Diagnosis, Discharge, HealthCheckRating } from '../types';
import { Formik, Field, Form } from 'formik';
import { TextField, DiagnosisSelection, NumberField } from '../AddPatientModal/FormField';
import { useStateValue } from '../state';
import { Grid, Button } from 'semantic-ui-react';
import { SelectTypeField, TypeOption } from './FormField';

export interface EntryFormValues {
  type: string;
  description: string;
  date: string;
  specialist: string;
  diagnosisCodes?: Array<Diagnosis['code']>;
  discharge: Discharge;
  healthCheckRating: HealthCheckRating;
}

interface Props {
  onSubmit: (values: EntryFormValues) => void;
  onCancel: () => void;
}

const typeOptions: TypeOption[] = [
  { value: "Hospital", label: "Hospital visit" },
  { value: "OccupationalHealthcare", label: "Occupational healthcare"},
  { value: "HealthCheck", label: "Health check"}
];

const DATE_REGEX = /^\d{4}-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])$/;

export const AddEntryForm: React.FC<Props> = ({ onSubmit, onCancel }) => {
  const [{ diagnoses }] = useStateValue();

  const validate = (value: string): string | undefined => {
    if (!value) {
      return "Field is required";
    }
  };

  const validateDate = (value: string): string | undefined => {
    if (!value) {
      return "Field is required";
    }
    if (!DATE_REGEX.test(value)) {
      return "Incorrect format";
    }
  };

  return (
    <Formik
      initialValues={{
        type: "Hospital",
        description: "",
        date: "",
        specialist: "",
        diagnosisCodes: undefined, //TODO
        discharge: {
          date: "",
          criteria: ""
        },
        healthCheckRating: 3
      }}
      onSubmit={onSubmit}
    >
      {({ isValid, dirty, setFieldValue, setFieldTouched, values }) => {
        return (
          <Form className="form ui">
            <SelectTypeField
              label="Type"
              name="type"
              options={typeOptions}
            />
            <Field
              label="Description"
              placeholder="Description"
              name="description"
              component={TextField}
              validate={validate}
            />
            <Field
              label="Date"
              placeholder="YYYY-MM-DD"
              name="date"
              component={TextField}
              validate={validateDate}
            />
            <Field
              label="Specialist"
              placeholder="Specialist"
              name="specialist"
              component={TextField}
              validate={validate}
            />
            {values.type !== "HealthCheck" && (
              <DiagnosisSelection
                setFieldValue={setFieldValue}
                setFieldTouched={setFieldTouched}
                diagnoses={Object.values(diagnoses)}
              />
            )}
            {values.type === "HealthCheck" && (
              <Field
                label="healthCheckRating"
                name="healthCheckRating"
                component={NumberField}
                min={0}
                max={3}
              />
            )}
            {values.type === "Hospital" && (
            <>
              <Field 
                label="Discharge date"
                placeholder="YYYY-MM-DD"
                name="discharge.date"
                component={TextField}
                validate={validateDate}
              />
              <Field
                label="Discharge criteria"
                placeholder="Criteria"
                name="discharge.criteria"
                component={TextField}
                validate={validate}
              />
            </>
            )}
            <Grid>
              <Grid.Column floated="left" width={5}>
                <Button type="button" onClick={onCancel} color="red">
                  Cancel
                </Button>
              </Grid.Column>
              <Grid.Column floated="right" width={5}>
                <Button
                  type="submit"
                  floated="right"
                  color="green"
                  disabled={!dirty || !isValid}
                >
                  Add
                </Button>
              </Grid.Column>
            </Grid>
          </Form>
        );
      }}
    </Formik>
  );
};

export default AddEntryForm;