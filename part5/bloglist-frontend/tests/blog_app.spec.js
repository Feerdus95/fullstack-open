import { test, expect } from '@playwright/test'

test.describe('Blog app', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:5173')
  })

  test('login form is shown', async ({ page }) => {
    await expect(page.getByText('username')).toBeVisible()
    await expect(page.getByText('password')).toBeVisible()
    await expect(page.getByRole('button', { name: 'login' })).toBeVisible()
  })

  test('login fails with wrong credentials', async ({ page }) => {
    await page.getByTestId('username').fill('wronguser')
    await page.getByTestId('password').fill('wrongpass')
    await page.getByRole('button', { name: 'login' }).click()

    const errorDiv = page.getByText('Wrong username or password')
    await expect(errorDiv).toBeVisible()
    await expect(errorDiv).toHaveCSS('color', 'rgb(255, 0, 0)')
    await expect(page.getByRole('button', { name: 'login' })).toBeVisible()
  })

  test.describe('When logged in', () => {
    test.beforeEach(async ({ page }) => {
      await page.getByTestId('username').fill('testuser')
      await page.getByTestId('password').fill('password123')
      await page.getByRole('button', { name: 'login' }).click()
      await expect(page.getByRole('button', { name: 'logout' })).toBeVisible()
    })

    test('a new blog can be created', async ({ page }) => {
      await page.getByRole('button', { name: 'create new blog' }).click()

      const testTitle = 'New Test Blog ' + Date.now()

      await page.getByTestId('title').fill(testTitle)
      await page.getByTestId('author').fill('Test Author')
      await page.getByTestId('url').fill('http://testblog.com')

      await page.getByRole('button', { name: 'create' }).click()

      // Wait for the blog to appear
      await page.waitForSelector(`.blog:has-text("${testTitle}")`)
    })

    test('users can like a blog', async ({ page }) => {
      await page.getByRole('button', { name: 'create new blog' }).click()

      const testTitle = 'Like Test Blog ' + Date.now()

      await page.getByTestId('title').fill(testTitle)
      await page.getByTestId('author').fill('Test Author')
      await page.getByTestId('url').fill('http://testblog.com')

      await page.getByRole('button', { name: 'create' }).click()

      // Wait for the blog to appear and click its view button
      await page.waitForSelector(`.blog:has-text("${testTitle}")`)
      await page.locator(`.blog:has-text("${testTitle}") button:has-text("view")`).click()

      // Get initial likes
      const likesElement = page.getByTestId('likes-count')
      await expect(likesElement).toBeVisible()
      const initialLikes = await likesElement.innerText()

      // Click like button and wait for update
      await page.locator('.blog-details button:has-text("like")').click()

      // Wait for likes to update
      await expect(async () => {
        const currentLikes = await likesElement.innerText()
        expect(currentLikes).not.toBe(initialLikes)
      }).toPass({
        timeout: 5000
      })
    })

    test('creator can delete their blog', async ({ page }) => {
      await page.getByRole('button', { name: 'create new blog' }).click()

      const testTitle = 'Blog to be deleted ' + Date.now()

      await page.getByTestId('title').fill(testTitle)
      await page.getByTestId('author').fill('Test Author')
      await page.getByTestId('url').fill('http://testblog.com')

      await page.getByRole('button', { name: 'create' }).click()

      // Wait for the blog to appear and click its view button
      await page.waitForSelector(`.blog:has-text("${testTitle}")`)
      await page.locator(`.blog:has-text("${testTitle}") button:has-text("view")`).click()

      // Wait for the blog details to be visible
      await page.waitForSelector('.blog-details')

      // Set up dialog handler before clicking remove
      page.on('dialog', dialog => dialog.accept())

      // Click remove button
      await page.locator('.blog-details button:has-text("remove")').click()

      // Wait for a moment to let the deletion complete
      await page.waitForTimeout(1000)

      // Verify that the blog container is removed
      await expect(page.locator(`.blog:has-text("${testTitle}")`)).toHaveCount(0)
    })

    test('remove button is only visible to creator', async ({ page }) => {
      // First user creates a blog
      await page.getByRole('button', { name: 'create new blog' }).click()

      const testTitle = 'Creator visibility test blog ' + Date.now()
      await page.getByTestId('title').fill(testTitle)
      await page.getByTestId('author').fill('Test Author')
      await page.getByTestId('url').fill('http://testblog.com')

      await page.getByRole('button', { name: 'create' }).click()

      // View the blog details
      await page.waitForSelector(`.blog:has-text("${testTitle}")`)
      await page.locator(`.blog:has-text("${testTitle}") button:has-text("view")`).click()

      // Verify remove button is visible for creator
      await expect(page.locator('.blog-details button:has-text("remove")')).toBeVisible()

      // Log out
      await page.getByRole('button', { name: 'logout' }).click()

      // Log in as different user
      await page.getByTestId('username').fill('anotheruser')
      await page.getByTestId('password').fill('password123')
      await page.getByRole('button', { name: 'login' }).click()

      // View the blog details again
      await page.waitForSelector(`.blog:has-text("${testTitle}")`)
      await page.locator(`.blog:has-text("${testTitle}") button:has-text("view")`).click()

      // Verify remove button is not visible for non-creator
      await expect(page.locator('.blog-details button:has-text("remove")')).not.toBeVisible()
    })

    test('blogs are ordered by number of likes', async ({ page }) => {
      // Create first blog
      const firstBlogTitle = 'First Blog ' + Date.now()

      // Click create new blog button
      await page.getByRole('button', { name: 'create new blog' }).click()

      // Fill and submit first blog
      await page.getByTestId('title').fill(firstBlogTitle)
      await page.getByTestId('author').fill('Test Author')
      await page.getByTestId('url').fill('http://test1.com')
      await page.getByRole('button', { name: 'create' }).click()

      // Wait for the first blog to be visible
      await page.waitForSelector(`.blog:has-text("${firstBlogTitle}")`)

      // Click cancel to reset the form visibility
      await page.getByRole('button', { name: 'cancel' }).click()
      await page.waitForTimeout(1000)

      // Create second blog
      const secondBlogTitle = 'Second Blog ' + Date.now()

      // Now the create new blog button should be visible again
      await page.getByRole('button', { name: 'create new blog' }).click()

      // Fill and submit second blog
      await page.getByTestId('title').fill(secondBlogTitle)
      await page.getByTestId('author').fill('Test Author')
      await page.getByTestId('url').fill('http://test2.com')
      await page.getByRole('button', { name: 'create' }).click()

      // Wait for both blogs to be visible
      await page.waitForSelector(`.blog:has-text("${secondBlogTitle}")`)

      // Click cancel again to clear the form
      await page.getByRole('button', { name: 'cancel' }).click()

      // Open both blogs
      await page.locator(`.blog:has-text("${firstBlogTitle}") button:has-text("view")`).click()
      await page.locator(`.blog:has-text("${secondBlogTitle}") button:has-text("view")`).click()

      // Like the second blog twice
      const secondBlogLikeButton = page.locator(`.blog:has-text("${secondBlogTitle}") button:has-text("like")`)
      await secondBlogLikeButton.click()
      await page.waitForTimeout(500)
      await secondBlogLikeButton.click()
      await page.waitForTimeout(500)

      // Reload the page
      await page.reload()

      // Wait for blogs to be loaded after reload
      await page.waitForSelector('.blog')
      await page.waitForTimeout(1000)

      // Get all blogs and verify we have at least two
      const blogs = await page.locator('.blog').all()
      expect(blogs.length).toBeGreaterThan(1)

      // Get the text content of the first blog
      const firstBlogText = await blogs[0].innerText()

      // Verify that the second blog (with more likes) is first
      expect(firstBlogText).toContain(secondBlogTitle)
    })
  })
})