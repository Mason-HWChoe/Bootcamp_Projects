import axios from 'axios';
import { ChangeEvent, FormEvent, useState } from 'react';
import Footer from '../components/Footer';
import styles from './AIPage.module.css';

interface ChatMessage {
  role: string;
  content: string;
}

interface OpenAIResponse {
  id: string;
  object: string;
  created: number;
  model: string;
  usage: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
  };
  choices: Array<{
    message: ChatMessage;
    finish_reason: string;
    index: number;
  }>;
}

export default function AIPage() {
  const [question, setQuestion] = useState('');
  const [responses, setResponses] = useState<ChatMessage[]>([]);
  const [loading, setLoading] = useState(false);

  const AI_API_KEY = process.env.REACT_APP_OPENAI_API_KEY;

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setQuestion(e.target.value);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setResponses((prevResponses) => [
      ...prevResponses,
      { role: 'user', content: question },
    ]);
    setLoading(true);
    try {
      const res = await axios.post<OpenAIResponse>(
        'https://api.openai.com/v1/chat/completions',
        {
          model: 'gpt-3.5-turbo',
          messages: [
            { role: 'system', content: 'You are a helpful assistant.' },
            { role: 'user', content: question },
            ...responses.map((response) => ({
              role: 'assistant',
              content: response.content,
            })),
          ],
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${AI_API_KEY}`,
          },
        },
      );
      setLoading(false);
      setResponses((prevResponses) => [
        ...prevResponses,
        { role: 'assistant', content: res.data.choices[0].message.content },
      ]);
      setQuestion('');
    } catch (error) {
      console.error('Error:', error);
      setLoading(false);
    }
  };

  return (
    <>
      <div className={`${styles.AIPageContainer} p-5`}>
        <div className="container mb-5">
          <div
            className={`${styles.chatContainer} bg-white rounded p-5 border border-secondary`}
          >
            {responses.map((message, index) => (
              <div key={index}>
                {message.role === 'user' ? (
                  <p className="fw-bold">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="bi bi-question-circle text-danger"
                      viewBox="0 0 16 16"
                    >
                      <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                      <path d="M5.255 5.786a.237.237 0 0 0 .241.247h.825c.138 0 .248-.113.266-.25.09-.656.54-1.134 1.342-1.134.686 0 1.314.343 1.314 1.168 0 .635-.374.927-.965 1.371-.673.489-1.206 1.06-1.168 1.987l.003.217a.25.25 0 0 0 .25.246h.811a.25.25 0 0 0 .25-.25v-.105c0-.718.273-.927 1.01-1.486.609-.463 1.244-.977 1.244-2.056 0-1.511-1.276-2.241-2.673-2.241-1.267 0-2.655.59-2.75 2.286zm1.557 5.763c0 .533.425.927 1.01.927.609 0 1.028-.394 1.028-.927 0-.552-.42-.94-1.029-.94-.584 0-1.009.388-1.009.94z" />
                    </svg>{' '}
                    {message.content}
                  </p>
                ) : (
                  <p className="mb-4">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="bi bi-exclamation-circle text-primary"
                      viewBox="0 0 16 16"
                    >
                      <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                      <path d="M7.002 11a1 1 0 1 1 2 0 1 1 0 0 1-2 0zM7.1 4.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 4.995z" />
                    </svg>{' '}
                    {message.content}
                  </p>
                )}
              </div>
            ))}
            {loading && (
              <div className="d-flex align-items-center">
                <strong className="text-success">Loading...</strong>
                <div
                  className="spinner-border text-success"
                  role="status"
                  aria-hidden="true"
                ></div>
              </div>
            )}
          </div>
          <form onSubmit={handleSubmit} className="mt-2">
            <div className="input-group mb-3">
              <input
                type="text"
                value={question}
                onChange={handleChange}
                className="form-control"
                placeholder="AI에게 질문해보세요."
              />
              <button className="btn btn-outline-primary" type="submit">
                검색하기
              </button>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
}
