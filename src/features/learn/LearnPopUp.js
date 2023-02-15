import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Modal } from 'react-bootstrap';
import ReactMarkdown from "react-markdown";

import { changeLearnModal, setModalShow } from './learnSlice';
import topics from './topics/index';

const LearnPopUp = (props) => {
  const dispatch = useDispatch();
  const [markdown, setMarkdown] = useState('');
  const {modalShow, topic} = useSelector(state => state.learn)

  useEffect(() => {
    if(topic){
      if (topics[topic]){
        setMarkdown(topics[topic]);
      } else {
        setMarkdown(topics['noData']);
      }
    }
  }, [topic]);
  return (
    <Modal
      show={modalShow}
      onHide={() => dispatch(changeLearnModal({modalShow: false, topic: ''}))}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header className='learn-modal' closeButton closeVariant='white'/>
      <Modal.Body>
      <ReactMarkdown children={markdown} />
      </Modal.Body>
    </Modal>
  );
}

export default LearnPopUp;
