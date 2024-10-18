/* eslint-disable @next/next/no-img-element */
'use server'

import { headers } from 'next/headers'

const purplePrimary = '#7C7AFF'
const purple800 = '#44438c'

const verificationMailTemplate = async (
  name: string,
  tokenId: string,
): Promise<string> => {
  const { renderToString } = await import('react-dom/server')

  const protocol = headers().get('x-forwarded-proto') as string
  const baseUrl = protocol + '://' + process.env.NEXTAUTH_DOMAIN
  const message = ` Thank you for registering with easylinks! To continue, click the button below to verify your account.`

  return renderToString(
    <table
      width="100%"
      cellPadding="0"
      cellSpacing="0"
      style={{ backgroundColor: '#f9f9f9', width: '100%' }}
    >
      <tbody>
        <tr>
          <td align="center">
            <table
              width="640"
              cellPadding="0"
              cellSpacing="0"
              style={{
                background: 'transparent',
                margin: '0 auto',
                maxWidth: '640px',
              }}
            >
              <tbody>
                <tr>
                  <td align="center" style={{ padding: '30px 0' }}>
                    <table
                      role="presentation"
                      cellPadding="0"
                      cellSpacing="0"
                      align="center"
                      style={{ textAlign: 'center' }}
                    >
                      <tbody>
                        <tr>
                          <td valign="middle" style={{ paddingRight: '7px' }}>
                            <img
                              alt="easylinks logo"
                              src="https://easylinks.vercel.app/easylinks.png"
                              height="30"
                              width="30"
                              style={{ display: 'block', userSelect: 'none' }}
                            />
                          </td>
                          <td valign="middle" style={{ textAlign: 'left' }}>
                            <h3
                              style={{
                                fontWeight: 'bold',
                                background: `linear-gradient(to right, ${purplePrimary}, ${purple800})`,
                                backgroundClip: 'text',
                                color: 'transparent',
                                margin: 0,
                                display: 'inline-block',
                                fontSize: 16,
                                userSelect: 'none',
                              }}
                            >
                              easy
                              <span style={{ display: 'inline-block' }}>
                                links.
                              </span>
                            </h3>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </td>
                </tr>

                <tr>
                  <td align="center">
                    <table
                      width="100%"
                      cellPadding="0"
                      cellSpacing="0"
                      style={{
                        maxWidth: '640px',
                        margin: '0 auto',
                        background: 'white',
                        padding: '30px 50px',
                        borderRadius: '4px',
                        overflow: 'hidden',
                      }}
                    >
                      <tbody>
                        <tr>
                          <td
                            align="left"
                            style={{
                              fontSize: '16px',
                              color: '#737f8d',
                              lineHeight: '24px',
                              fontFamily:
                                'Whitney,Helvetica Neue,Helvetica,Arial,Lucida Grande,sans-serif',
                            }}
                          >
                            <h2
                              style={{
                                fontWeight: '500',
                                fontSize: '20px',
                                color: '#4f545c',
                                letterSpacing: '0.27px',
                                margin: '0 0 20px 0',
                              }}
                            >
                              Hi, {name}
                            </h2>
                            <p style={{ margin: 0 }}>{message}</p>
                          </td>
                        </tr>

                        <tr>
                          <td align="center" style={{ paddingTop: '20px' }}>
                            <a
                              href={baseUrl + `/verify/${tokenId}`}
                              target="_blank"
                              style={{
                                display: 'inline-block',
                                textDecoration: 'none',
                                background: `linear-gradient(to right, ${purplePrimary}, ${purple800})`,
                                color: 'white',
                                fontSize: '16px',
                                padding: '10px 20px',
                                borderRadius: '8px',
                                border: `1px solid ${purplePrimary}`,
                                fontWeight: '500',
                                textTransform: 'none',
                              }}
                            >
                              Active account
                            </a>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </td>
                </tr>

                <tr>
                  <td align="center" style={{ padding: '30px 50px' }}>
                    <table
                      width="100%"
                      cellPadding="0"
                      cellSpacing="0"
                      style={{
                        maxWidth: '640px',
                        margin: '0 auto',
                        textAlign: 'center',
                      }}
                    >
                      <tbody>
                        <tr>
                          <td
                            style={{
                              color: '#99aab5',
                              fontFamily:
                                'Whitney,Helvetica Neue,Helvetica,Arial,Lucida Grande,sans-serif',
                              fontSize: '12px',
                              lineHeight: '24px',
                            }}
                          >
                            Copyright © 2024 - easylinks. Todos os direitos
                            reservados.
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </td>
                </tr>
              </tbody>
            </table>
          </td>
        </tr>
      </tbody>
    </table>,
  )
}

const recoverPasswordTemplate = async (
  name: string,
  tokenId: string,
): Promise<string> => {
  const { renderToString } = await import('react-dom/server')

  const protocol = headers().get('x-forwarded-proto') as string
  const baseUrl = protocol + '://' + process.env.NEXTAUTH_DOMAIN
  const message = `We have received a request to reset your account password, click the button below to reset it. If it wasn't you, you can just ignore it.`

  return renderToString(
    <table
      width="100%"
      cellPadding="0"
      cellSpacing="0"
      style={{ backgroundColor: '#f9f9f9', width: '100%' }}
    >
      <tbody>
        <tr>
          <td align="center">
            <table
              width="640"
              cellPadding="0"
              cellSpacing="0"
              style={{
                background: 'transparent',
                margin: '0 auto',
                maxWidth: '640px',
              }}
            >
              <tbody>
                <tr>
                  <td align="center" style={{ padding: '30px 0' }}>
                    <table
                      role="presentation"
                      cellPadding="0"
                      cellSpacing="0"
                      align="center"
                      style={{ textAlign: 'center' }}
                    >
                      <tbody>
                        <tr>
                          <td valign="middle" style={{ paddingRight: '7px' }}>
                            <img
                              alt="easylinks logo"
                              src="https://easylinks.vercel.app/easylinks.png"
                              height="30"
                              width="30"
                              style={{ display: 'block', userSelect: 'none' }}
                            />
                          </td>
                          <td valign="middle" style={{ textAlign: 'left' }}>
                            <h3
                              style={{
                                fontWeight: 'bold',
                                background: `linear-gradient(to right, ${purplePrimary}, ${purple800})`,
                                backgroundClip: 'text',
                                color: 'transparent',
                                margin: 0,
                                display: 'inline-block',
                                fontSize: 16,
                                userSelect: 'none',
                              }}
                            >
                              easy
                              <span style={{ display: 'inline-block' }}>
                                links.
                              </span>
                            </h3>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </td>
                </tr>

                <tr>
                  <td align="center">
                    <table
                      width="100%"
                      cellPadding="0"
                      cellSpacing="0"
                      style={{
                        maxWidth: '640px',
                        margin: '0 auto',
                        background: 'white',
                        padding: '30px 50px',
                        borderRadius: '4px',
                        overflow: 'hidden',
                      }}
                    >
                      <tbody>
                        <tr>
                          <td
                            align="left"
                            style={{
                              fontSize: '16px',
                              color: '#737f8d',
                              lineHeight: '24px',
                              fontFamily:
                                'Whitney,Helvetica Neue,Helvetica,Arial,Lucida Grande,sans-serif',
                            }}
                          >
                            <h2
                              style={{
                                fontWeight: '500',
                                fontSize: '20px',
                                color: '#4f545c',
                                letterSpacing: '0.27px',
                                margin: '0 0 20px 0',
                              }}
                            >
                              Hi, {name}
                            </h2>
                            <p style={{ margin: 0 }}>{message}</p>
                          </td>
                        </tr>

                        <tr>
                          <td align="center" style={{ paddingTop: '20px' }}>
                            <a
                              href={baseUrl + `/verify/${tokenId}`}
                              target="_blank"
                              style={{
                                display: 'inline-block',
                                textDecoration: 'none',
                                background: `linear-gradient(to right, ${purplePrimary}, ${purple800})`,
                                color: 'white',
                                fontSize: '16px',
                                padding: '10px 20px',
                                borderRadius: '8px',
                                border: `1px solid ${purplePrimary}`,
                                fontWeight: '500',
                                textTransform: 'none',
                              }}
                            >
                              Recover password
                            </a>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </td>
                </tr>

                <tr>
                  <td align="center" style={{ padding: '30px 50px' }}>
                    <table
                      width="100%"
                      cellPadding="0"
                      cellSpacing="0"
                      style={{
                        maxWidth: '640px',
                        margin: '0 auto',
                        textAlign: 'center',
                      }}
                    >
                      <tbody>
                        <tr>
                          <td
                            style={{
                              color: '#99aab5',
                              fontFamily:
                                'Whitney,Helvetica Neue,Helvetica,Arial,Lucida Grande,sans-serif',
                              fontSize: '12px',
                              lineHeight: '24px',
                            }}
                          >
                            Copyright © 2024 - easylinks. Todos os direitos
                            reservados.
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </td>
                </tr>
              </tbody>
            </table>
          </td>
        </tr>
      </tbody>
    </table>,
  )
}
export { verificationMailTemplate, recoverPasswordTemplate }
