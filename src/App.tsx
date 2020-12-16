import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Field, Form, Formik } from 'formik';
import { Button, Grid, TextField } from '@material-ui/core';
import { FormTextField } from './FormTextField';

interface FormValues {
  // price: string;
  priceCents: number
}

const sleep = (ms :number) => new Promise(r => setTimeout(r, ms));

const masks = [
  { name: 'phone-1', parse: '999-999-9999' },
  { name: 'phone-2', parse: '(999) 999-9999' },
  { name: 'phone-3', parse: '+49 (AAAA) BBBBBB' },
];

const formatCentsToDollars = (cents: number) => (cents/100).toFixed(2)
const parseDollarsToCents = (dollars: string) => parseFloat(dollars) * 100;
function App() {

  const priceCents = 1000;

  return (
    <div className="App">
      <header className="App-header">
        Number input demo
      </header>
      <main>
      <Formik<FormValues>
        // initialValues={masks.reduce((prev: any, curr) => {
        //   prev[curr.name] = '';
        //   return prev;
        // }, {})}
        initialValues={{
          // price: formatCentsToDollars(priceCents),
          priceCents
        }}
        onSubmit={async values => {
          await sleep(500);
          console.log({values});
        }}
        >{({ values }) => (
          <Form>
            <Grid alignContent="flex-start" container spacing={2}>
              <Grid item xs={12}>
                {/* <label>
                  Price
                  <Field
                    name="priceCents"
                    parse={(value) => parseFloat(value as string) * 100}
                    format={(value) => (value/100).toFixed(2)}
                    placeholder="enter price"
                  />
                </label> */}
                {/* <FormTextField name="price" onChange={(event) => console.log(event.target.value)} /> */}
                <FormTextField name="priceCents" onChange={(event) => {
                  console.log(event.target.value, typeof event.target.value )
                }} />
                {/* {masks.map((mask) => (
                  <div key={mask.name}>
                    <label>
                      {mask.name}
                      <Field
                        name={mask.name}
                        parse={formatString(mask.parse) as any}
                        placeholder={mask.parse}
                      />
                    </label>
                  </div>
                ))} */}
              </Grid>
              <Grid item xs={12}>
                <Button color="primary" variant="contained" type="submit">Submit</Button>
              </Grid>
              <Grid item xs={12}>
                <pre>{JSON.stringify(values, null, 2)}</pre>
              </Grid>
            </Grid>
            
          </Form>
        )}
      </Formik>
      </main>
    </div>
  );
}

export default App;
