import { FC } from 'react';
import { Button, Form, Input } from 'antd';
import { canvasDrawerBody } from '../../constants/DATA';
import styles from './index.module.scss';
import { SideDrawerBodyProps } from './types';
import { toastText } from '../../utils/index';

// Dynamic side drawer body
const SideDrawerBody: FC<SideDrawerBodyProps> = (props) => {
  // Inits
  const { userFields } = canvasDrawerBody;
  const { closeDrawerByAnimation, addCoordinateHandler } = props;
  // If form get success
  const onFinish = (values: any) => {
    toastText('User created successfully', 'success');
    closeDrawerByAnimation();
    addCoordinateHandler(values);
  };

  // If form fails
  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  // JSX
  return (
    <div className={styles['side-drawer-body']}>
      <Form
        name="basic"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        layout="vertical"
        labelAlign="left"
        className={styles['side-drawer-form']}
      >
        <div className={styles['side-drawer-form__inputs']}>
          {userFields.map((singleField, index) => {
            return (
              <div
                key={index}
                className={styles['side-drawer-form__single-input']}
              >
                <label
                  className={styles['side-drawer-form__single-input--label']}
                >
                  {singleField.title} *
                </label>
                <Form.Item
                  name={singleField.name}
                  className={styles['side-drawer-form__single-input--input']}
                  rules={[
                    {
                      required: true,
                      message: singleField.errorMessage,
                    },
                  ]}
                >
                  <Input
                    placeholder={singleField.placeholder}
                    size="large"
                    type={singleField.type}
                  />
                </Form.Item>
              </div>
            );
          })}
        </div>
        <div className={styles['side-drawer-form__buttons']}>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              size="large"
              className={`w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-purple-700 rounded-md hover:!bg-purple-600 focus:outline-none focus:bg-purple-600 ${styles['side-drawer-form__save']}`}
            >
              Save
            </Button>
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="button"
              size="large"
              ghost={true}
              className={styles['side-drawer-form__cancel']}
              onClick={closeDrawerByAnimation}
            >
              Cancel
            </Button>
          </Form.Item>
        </div>
      </Form>
    </div>
  );
};

export default SideDrawerBody;
