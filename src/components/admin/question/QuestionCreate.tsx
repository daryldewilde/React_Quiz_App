import { Create, ReferenceInput, required, SelectInput, SimpleForm, TextInput } from "react-admin";

interface CategoryForm{
   question_text?:string,
   answer_options?:string,
   correct_answer?:string,
   Category_id?:string
}
 
export function validateQuestionsFunction(values:CategoryForm):CategoryForm{
    const errors:CategoryForm ={}
    if (!values.question_text){
        errors.question_text = "The question_text is  Required"
    }

    if (!values.Category_id){
        errors.Category_id = "The Category is  Required"
    }

    if (!values.answer_options){
        errors.answer_options = "The answer_options are  Required"
    }

    if (!values.correct_answer){
        errors.correct_answer = "The category Name is correct_answer Required"
    }else if(values.correct_answer?.length > 8){
        errors.correct_answer = "The answer length should not be more than 8 character Example: answer_a"
    }

    return errors
}

export default function QuestionCreate(){
    return(
        <Create>
             <SimpleForm validate={validateQuestionsFunction}>
                <ReferenceInput source="Category_id" reference="Categories">
                    <SelectInput optionText="name" validate={required()} />
                </ReferenceInput>
                <TextInput source="question_text" multiline rows={2} validate={required()}/>
                <TextInput source="answer_options" multiline rows={5} validate={required()}/>
                <TextInput source="correct_answer" validate={required()}/>
            </SimpleForm>
        </Create>
    )
}