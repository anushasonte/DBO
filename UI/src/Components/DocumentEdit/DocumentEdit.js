import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button, Container, Form, FormGroup, Input, Label } from 'reactstrap';
import * as Constants from "../Constants";

const DocumentEdit = () => {
  const initialFormState = {
    docid: '',
    doc_category: '',
    doc_room_number: 1,
    doc_room_level: 1,
    doc_rack_number: 1,
    doc_rack_level: 1,
    doc_isdigitalversion: "Y",
    doc_isissuedby: null,
    doc_borrowedby: null,
    doc_issuedtimestamp: null,
    doc_totalnoofcopies: 1,
    doc_noofcopiesavailable: 1,
    doc_lastmodifiedtimestamp: null
  };
  const [document, setDocument] = useState(initialFormState);
//   const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (id !== 'new') {
      fetch(`http://localhost:8080/api/v1/documents/${id}`,
      { headers: {
        "Access-Control-Allow-Origin": "*",
        'Authorization': `Bearer ${sessionStorage.getItem(Constants.AUTH)}`
       }}
      )
        .then(response => response.json())
        .then(data => setDocument(data));
    }
  }, [id, setDocument]);

  const handleChange = (event) => {
    const { name, value } = event.target

    setDocument({ ...document, [name]: value })
  }

  const handleSubmit = async (event) => {
    event.preventDefault();

    await fetch("http://localhost:8080/api/v1/documents/" + (document.docid ? '/' + document.docid : ''), {
      method: (document.docid) ? 'PUT' : 'POST',
       headers: {
        "Access-Control-Allow-Origin": "*",
        'Authorization': `Bearer ${sessionStorage.getItem(Constants.AUTH)}`
       },
      body: JSON.stringify(document)
    });
    setDocument(initialFormState);
    // navigate('/documents');
    this.props.history.push('/documents');
  }

  const title = <h2>{document.docid ? 'Edit Document' : 'Add Document'}</h2>;

  return (<div>
      <Container>
        {title}
        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <Label for="docid">docid</Label>
            <Input type="text" name="docid" id="docid" value={document.docid || ''}
                   onChange={handleChange} autoComplete="docid"/>
          </FormGroup>
          <FormGroup>
            <Label for="doc_category">doc_category</Label>
            <Input type="text" name="doc_category" id="doc_category" value={document.doc_category || ''}
                   onChange={handleChange} autoComplete="address-level1"/>
          </FormGroup>
          {/* <FormGroup>
            <Label for="city">City</Label>
            <Input type="text" name="city" id="city" value={group.city || ''}
                   onChange={handleChange} autoComplete="address-level1"/>
          </FormGroup>
          <div className="row">
            <FormGroup className="col-md-4 mb-3">
              <Label for="stateOrProvince">State/Province</Label>
              <Input type="text" name="stateOrProvince" id="stateOrProvince" value={group.stateOrProvince || ''}
                     onChange={handleChange} autoComplete="address-level1"/>
            </FormGroup>
            <FormGroup className="col-md-5 mb-3">
              <Label for="country">Country</Label>
              <Input type="text" name="country" id="country" value={group.country || ''}
                     onChange={handleChange} autoComplete="address-level1"/>
            </FormGroup>
            <FormGroup className="col-md-3 mb-3">
              <Label for="country">Postal Code</Label>
              <Input type="text" name="postalCode" id="postalCode" value={group.postalCode || ''}
                     onChange={handleChange} autoComplete="address-level1"/>
            </FormGroup> */}
          {/* </Form></div> */}
          <FormGroup>
            <Button color="primary" type="submit">Save</Button>{' '}
            <Button color="secondary" tag={Link} to="/documents">Cancel</Button>
          </FormGroup>
        </Form>
      </Container>
    </div>
  )
};

export default DocumentEdit;