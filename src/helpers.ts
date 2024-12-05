import { BackendQuestionInterface, QuestionInterface } from "./state/quizSlice"

export const shuffleAnswers = (question: QuestionInterface) => {
    const unshuffledAnswer = [
        question.correctAnswer,
        ...question.incorrectAnswers
    ]


    return unshuffledAnswer.map(item => ({
        sort: Math.random(),
        value: item
    })).sort((a, b) => a.sort - b.sort)
        .map(a => a.value)
}


export const normalizeQuestions = (backendQuestions: BackendQuestionInterface[]): QuestionInterface[] => {
    return backendQuestions.map(item => {
        const incorrectAnswers = item.incorrect_answers.map(incorrectAnswer => decodeURIComponent(incorrectAnswer))

        return {
            correctAnswer: decodeURIComponent(item.correct_answer),
            question: decodeURIComponent(item.question),
            incorrectAnswers: incorrectAnswers
        }
    })
}