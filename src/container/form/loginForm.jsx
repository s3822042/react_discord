import React from "react";
import useBreakPoint from "../../hooks/useBreakPoint";
// -- Components --
import { QRContainer } from "../index";
import { Formik, Field } from "formik";
import { Form, FlexBox } from "../../components";
// -- Backend --
import { useMutation } from "@apollo/client";
import { useHistory } from "react-router-dom";
import { SIGN_IN } from "../../core/graphql/mutations/userMutation";
// -- Redux --
import { connect } from "react-redux";
import { loginUser } from "../../core/redux/actions/user.action.js";
// -- Constants --
import * as ROUTES from "../../constants/routes";
import * as ASSETS from "../../constants/assets";
// -- Validate --
import * as yup from "yup";
import { validRuleSet } from "../../utils/validate";

const validationSchema = yup.object({
	email: validRuleSet.email,
	password: validRuleSet.password,
});

function LoginFormContainer({ animatedVariables, ...props }) {
	const [signIn] = useMutation(SIGN_IN);
	const breakPoint = useBreakPoint();
	const history = useHistory();
	return (
		<Formik
			validateOnChange={false}
			validateOnBlur={false}
			initialValues={{
				email: "",
				password: "",
			}}
			onSubmit={async (data) => {
				await props.loginUser(signIn, data, history);
			}}
			validationSchema={validationSchema}
		>
			{({ values, handleSubmit, errors }) => (
				<Form.Wrapper>
					<Form className="__hasNoBackground">
						<Form.Inner
							width={breakPoint > 800 ? "784px" : "fit-content"}
							minHeight={"408px"}
							bgColor={"#383B41"}
							variants={animatedVariables.Inner}
							style={{ boxShadow: "0 2px 10px 0 rgba(0,0,0,.2)" }}
							exit="exit"
							initial="initial"
							animate="open"
							transition="transition"
						>
							<FlexBox direction="row" className="__login_inner">
								<FlexBox direction="column" className="__login_input_area">
									{breakPoint < 580 && (
										<img
											src={ASSETS.FULL_LOGO}
											alt="Discord Full Logo"
											style={{ height: "30px", marginBottom: "60px" }}
										/>
									)}
									<Form.Header>Ch??o m???ng tr??? l???i!</Form.Header>
									<Form.Body>R???t vui m???ng khi ???????c g???p l???i b???n!</Form.Body>
									<Form.Base onSubmit={handleSubmit}>
										<Field
											value={values.email}
											type="input"
											label="Email"
											name="email"
											errorText={
												errors.email ||
												(props.UI.errors && props.UI.errors.login)
											}
											as={Form.InputWithLabelAndError}
										/>
										<Field
											value={values.password}
											type="password"
											label="M???t kh???u"
											name="password"
											errorText={errors.password}
											as={Form.InputWithLabelAndError}
										/>
										<Form.Link to="#">
											<span>Qu??n m???t kh???u?</span>
										</Form.Link>
										<Form.Button type="submit" disabled={props.UI.loading}>
											????ng nh???p
										</Form.Button>
										<Form.Text>
											C???n m???t t??i kho???n?
											<Form.Link to={ROUTES.__signup}>
												&nbsp;<span>????ng k??</span>
											</Form.Link>
										</Form.Text>
									</Form.Base>
								</FlexBox>
								{breakPoint > 800 && (
									<FlexBox direction="column" className="__login_qr_area">
										<QRContainer />
										<Form.Header>????ng nh???p b???ng m?? QR</Form.Header>
										<Form.Body>
											Qu??t b???ng <span>???ng d???ng di ?????ng Discord</span> ????ng nh???p
											t???c th??.
										</Form.Body>
									</FlexBox>
								)}
							</FlexBox>
						</Form.Inner>
					</Form>
				</Form.Wrapper>
			)}
		</Formik>
	);
}

const mapStateToProps = (state) => ({
	UI: state.ui,
});

const mapActionToProps = {
	loginUser,
};

export default connect(mapStateToProps, mapActionToProps)(LoginFormContainer);
