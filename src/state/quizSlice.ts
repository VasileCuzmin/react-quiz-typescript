import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { normalizeQuestions, shuffleAnswers } from "../helpers";

export interface BackendQuestionInterface {
    type: string;
    difficulty: string;
    category: string;
    question: string;
    correct_answer: string;
    incorrect_answers: string[];
}

export interface QuestionInterface {
    correctAnswer: string;
    incorrectAnswers: string[];
    question: string;
}

interface QuizState {
    currentQIndex: number;
    questions: QuestionInterface[];
    showResults: boolean,
    answers: string[],
    currentAnswer: string,
    correctAnswersCount: number,
    error: string | null;
}

const initialState: QuizState = {
    currentQIndex: 0,
    questions: [],
    showResults: false,
    answers: [],
    currentAnswer: '',
    correctAnswersCount: 0,
    error: null
};


const quizSlice = createSlice({
    name: 'quiz',
    initialState,
    reducers: {
        nextQuestion: (state) => {
            const showResults = state.currentQIndex === state.questions.length - 1;

            const currentQIndex = showResults ? state.currentQIndex : state.currentQIndex + 1;

            const answers = showResults ? [] : shuffleAnswers(state.questions[currentQIndex])

            return { ...state, currentQIndex: currentQIndex, showResults: showResults, answers, currentAnswer: '' }
        },
        restart: (state) => {
            return initialState
        },
        selectAnswer: (state, action: PayloadAction<string>) => {

            const correctAnswersCount = (action.payload === state.questions[state.currentQIndex].correctAnswer)
                ? state.correctAnswersCount + 1 : state.correctAnswersCount;

            return { ...state, currentAnswer: action.payload, correctAnswersCount }
        },
        loadQuestions: (state, action: PayloadAction<BackendQuestionInterface[]>) => {
            const normalizedQuestions = normalizeQuestions(action.payload)
            return { ...state, questions: normalizedQuestions, answers: shuffleAnswers(normalizedQuestions[0]) }
        },

        propagateError: (state, action: PayloadAction<string>) => {
            return { ...state, error: action.payload }
        },
    }
})


export const { nextQuestion, restart, selectAnswer, loadQuestions, propagateError } = quizSlice.actions

//reducers

export default quizSlice.reducer

