
import reduceMain from './reducer';

it('reduce is working', () => {

    const state = {
        arr: [
            {
                title: "are u ok?",
                matters: {
                    q1: { title: "yes", isCorrect: false },
                    q2: { title: "no", isCorrect: true },
                    q3: { title: "xz", isCorrect: false },
                },
            },
        ],
        isShow: false,
        id: null,
        rating: null,
        max: null,
    };

    let action = { type: "SHOW_FORM" };
    let action2 = { type: "RESULT", rating: 7, max: 3 };
    let action3 = { type: "CREATE_Q", payload: { text: 'hey' } };

    let newStateForm = reduceMain(state, action);
    let newStateRes = reduceMain(state, action2)
    let newStateAddQ = reduceMain(state, action3);

    expect(newStateForm.isShow).toBe(true);

    expect(newStateRes.rating).toBe(7);
    expect(newStateRes.max).toBe(3);

    expect(newStateAddQ.arr.length).toBe(2)

})